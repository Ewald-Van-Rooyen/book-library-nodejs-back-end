const {describe, it, expect} = require("@jest/globals");

const request = require("supertest");
const app = require("../app");

const version = 1;
const authorUrl = `/api/v${version}/author`;

describe("Authors API", () => {

  it("should show all authors", async (done) => {
    const result = await request(app).get(authorUrl);

    expect(result.statusCode).toEqual(200);
    expect(result.body[0]).toHaveProperty("firstName");
    done();
  });

  it("should show a author id 1", async (done) => {
    const result = await request(app).get(`${authorUrl}/1`);

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
      });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("firstName");
    expect(result.body.firstName).toEqual("Ewald");
    expect(result.body.lastName).toEqual("Van Rooyen");
    done();
  });

  it("should update an author", async (done) => {
    const getResult = await request(app).get(`${authorUrl}/3`);

    expect(getResult.statusCode).toEqual(200);
    expect(getResult.body).toHaveProperty("firstName");
    expect(getResult.body.firstName).toEqual("Theodor");
    expect(getResult.body.lastName).toEqual("Seuss");

    const result = await request(app)
      .put(`${authorUrl}/3`)
      .send({
        firstName: "Ryan",
        lastName: "Van Der Merwe",
      });
    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("firstName");
    expect(result.body.firstName).toEqual("Ryan");
    expect(result.body.lastName).toEqual("Van Der Merwe");
    done();
  });

  it("should delete an author", async (done) => {
    const result = await request(app)
      .del(`${authorUrl}/3`);
    expect(result.statusCode).toEqual(204);
    done();
  });

});
