const {describe, it, expect} = require("@jest/globals");

const request = require("supertest");
const app = require("../app");

const version = 1;
const categoryUrl = `/api/v${version}/category`;

describe("Category API", () => {

  it("should show all categories", async (done) => {
    const result = await request(app).get(categoryUrl);

    expect(result.statusCode).toEqual(200);
    expect(result.body[0]).toHaveProperty("description");
    done();
  });

  it("should show a category id 1", async (done) => {
    const result = await request(app).get(`${categoryUrl}/1`);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("name");
    done();
  });


  it("should create a new category", async (done) => {
    const result = await request(app)
      .post(categoryUrl)
      .send({
        name: "Horror",
        description: "Spooky stuff",
      });

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("name");
    expect(result.body.name).toEqual("Horror");
    expect(result.body.description).toEqual("Spooky stuff");
    done();
  });

  it("should update an category", async (done) => {
    const getResult = await request(app).get(`${categoryUrl}/3`);

    expect(getResult.statusCode).toEqual(200);
    expect(getResult.body).toHaveProperty("name");
    expect(getResult.body.name).toEqual("Dark Fantasy");
    expect(getResult.body.description).toEqual("Old Fantasy description stuff here");

    const result = await request(app)
      .put(`${categoryUrl}/3`)
      .send({
        name: "Light Fantasy",
        description: "Fairy stuff and all that",
      });
    console.log(result.body);
    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("name");
    expect(result.body.name).toEqual("Light Fantasy");
    expect(result.body.description).toEqual("Fairy stuff and all that");
    done();
  });

  it("should delete a user", async (done) => {
    const result = await request(app)
      .del(`${categoryUrl}/3`);
    expect(result.statusCode).toEqual(204);
    done();
  });
});
