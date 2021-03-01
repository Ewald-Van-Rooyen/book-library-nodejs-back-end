const {describe, it, expect} = require("@jest/globals");

const request = require("supertest");
const app = require("../app");

const version = 1;
const baseUrl = `/api/v${version}`;

describe("User API", () => {

  it("should signin a user", async (done) => {
    const result = await request(app)
      .post(`${baseUrl}/signin`)
      .send({
        username: "admin",
        password: "12345678",
      });

    expect(result.statusCode).toEqual(200);
    done();
  });

  it("should fail signin a user due to incorrect password length", async (done) => {
    const result = await request(app)
      .post(`${baseUrl}/signin`)
      .send({
        username: "admin",
        password: "1234",
      });

    expect(result.statusCode).toEqual(404);
    done();
  });

  it("should signup a user", async (done) => {
    const result = await request(app)
      .post(`${baseUrl}/signup`)
      .send({
        fullName: "Ewald Van Rooyen",
        email: "ewald@ewald.com",
        username: "Ewald42",
        password: "Ewald42",
      });

    expect(result.statusCode).toEqual(201);
    done();
  });
});
