const {describe, it, expect, beforeAll} = require("@jest/globals");

const request = require("supertest");
const app = require("../app");

const version = 1;
const authorUrl = `/api/v${version}/author`;
const baseUrl = `/api/v${version}/`;

let token = null;
const username = "admin";

describe("Authors API", () => {

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

  it("Author without auth token should fail", async (done) => {
    const result = await request(app).get(authorUrl);
    expect(result.statusCode).toEqual(403);
    done();
  });

  it("should show all authors", async (done) => {
    const result = await request(app).get(authorUrl)
      .set("x-access-token", token);

    expect(result.statusCode).toEqual(200);
    expect(result.body[0]).toHaveProperty("firstName");
    done();
  });

  it("should show a author id 1", async (done) => {
    const result = await request(app).get(`${authorUrl}/1`)
      .set("x-access-token", token);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("firstName");
    done();
  });

  it("should create a new author", async (done) => {
    const result = await request(app)
      .post(authorUrl)
      .send({
        firstName: "Ewald",
        lastName: "Van Rooyen",
      })
      .set("x-access-token", token)
      .set("x-access-username", username);

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("firstName");
    expect(result.body.firstName).toEqual("Ewald");
    expect(result.body.lastName).toEqual("Van Rooyen");
    expect(result.body.createdBy).toEqual(username);
    done();
  });

  it("should update an author", async (done) => {
    const getResult = await request(app).get(`${authorUrl}/3`)
      .set("x-access-token", token).set("x-access-username", username);

    expect(getResult.statusCode).toEqual(200);
    expect(getResult.body).toHaveProperty("firstName");
    expect(getResult.body.firstName).toEqual("Theodor");
    expect(getResult.body.lastName).toEqual("Seuss");
    expect(getResult.body.createdBy).toEqual(username);

    const result = await request(app)
      .put(`${authorUrl}/3`)
      .send({
        firstName: "Ryan",
        lastName: "Van Der Merwe",
      }).set("x-access-token", token).set("x-access-username", "root");

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("firstName");
    expect(result.body.firstName).toEqual("Ryan");
    expect(result.body.lastName).toEqual("Van Der Merwe");
    expect(result.body.updatedBy).toEqual("root");
    done();
  });

  it("should delete a disjoint author", async (done) => {
    const createResult = await request(app)
      .post(authorUrl)
      .send({
        firstName: "Senior",
        lastName: "Delete me",
      })
      .set("x-access-token", token);

    expect(createResult.statusCode).toEqual(201);
    expect(createResult.body).toHaveProperty("firstName");
    expect(createResult.body).toHaveProperty("id");
    expect(createResult.body.firstName).toEqual("Senior");

    const newAuthorId = createResult.body.id;

    const result = await request(app).del(`${authorUrl}/${newAuthorId}`)
      .set("x-access-token", token);

    expect(result.statusCode).toEqual(204);
    done();
  });

  it("should not be able to delete an assigned author", async (done) => {

    const result = await request(app).del(`${authorUrl}/3`)
      .set("x-access-token", token);

    expect(result.statusCode).toEqual(500);
    done();
  });

});
