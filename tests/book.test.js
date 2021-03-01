const {describe, it, expect, beforeAll} = require("@jest/globals");

const request = require("supertest");
const app = require("../app");

const version = 1;
const bookUrl = `/api/v${version}/book`;
const baseUrl = `/api/v${version}/`;

let token = null;
const username = "root";

describe("Books API", () => {

  beforeAll((done) => {
    request(app)
      .post(`${baseUrl}/signin`)
      .send({
        username: "admin",
        password: "12345678",
      })
      .end((err, response) => {
        token = response.body.token;

        done();
      });
  });

  it("Books without auth token should fail", async (done) => {
    const result = await request(app).get(bookUrl);
    expect(result.statusCode).toEqual(403);
    done();
  });

  it("should show all books", async (done) => {
    const result = await request(app).get(bookUrl)
      .set("x-access-token", token);

    expect(result.statusCode).toEqual(200);
    expect(result.body[0]).toHaveProperty("name");
    done();
  });

  it("should show a book id 1", async (done) => {
    const result = await request(app).get(`${bookUrl}/1`)
      .set("x-access-token", token);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("name");
    done();
  });

  it("should create a new book", async (done) => {
    const result = await request(app)
      .post(bookUrl)
      .send({
        name: "Book1",
        yearPublished: 2021,
        isbnNumber: "1",
        categoryId: 1,
        authorId: 1,
      }).set("x-access-token", token)
      .set("x-access-username", username);

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("name");
    expect(result.body.name).toEqual("Book1");
    expect(result.body.yearPublished).toEqual(2021);
    expect(result.body.isbnNumber).toEqual("1");
    expect(result.body.createdBy).toEqual(username);
    done();
  });

  it("should update a book", async (done) => {
    const getResult = await request(app).get(`${bookUrl}/3`)
      .set("x-access-token", token);

    expect(getResult.statusCode).toEqual(200);
    expect(getResult.body).toHaveProperty("name");
    expect(getResult.body.name).toEqual("Horton Hatches the Egg");
    expect(getResult.body.yearPublished).toEqual(1940);
    expect(getResult.body.createdBy).toEqual("admin");

    const result = await request(app)
      .put(`${bookUrl}/3`)
      .send({
        name: "Ryan",
        yearPublished: 1942,
        categoryId: 1,
        authorId: 1,
      }).set("x-access-token", token)
      .set("x-access-username", username);


    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("name");
    expect(result.body.name).toEqual("Ryan");
    expect(result.body.yearPublished).toEqual(1942);
    expect(result.body.updatedBy).toEqual(username);
    done();
  });

  it("should delete a book", async (done) => {
    const result = await request(app).del(`${bookUrl}/3`)
      .set("x-access-token", token);

    expect(result.statusCode).toEqual(204);
    done();
  });

});
