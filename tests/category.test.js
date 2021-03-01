const {describe, it, expect, beforeAll} = require("@jest/globals");

const request = require("supertest");
const app = require("../app");

const version = 1;
const categoryUrl = `/api/v${version}/category`;
const baseUrl = `/api/v${version}/`;

let token = null;

describe("Category API", () => {

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

  it("Category without auth token should fail", async (done) => {
    const result = await request(app).get(categoryUrl);
    expect(result.statusCode).toEqual(403);
    done();
  });

  it("should show all categories", async (done) => {
    const result = await request(app).get(categoryUrl)
      .set("x-access-token", token);

    expect(result.statusCode).toEqual(200);
    expect(result.body[0]).toHaveProperty("description");
    done();
  });

  it("should show a category id 1", async (done) => {
    const result = await request(app).get(`${categoryUrl}/1`)
      .set("x-access-token", token);

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
      })
      .set("x-access-token", token);

    expect(result.statusCode).toEqual(201);
    expect(result.body).toHaveProperty("name");
    expect(result.body.name).toEqual("Horror");
    expect(result.body.description).toEqual("Spooky stuff");
    done();
  });

  it("should update an category", async (done) => {
    const getResult = await request(app).get(`${categoryUrl}/3`)
      .set("x-access-token", token);

    expect(getResult.statusCode).toEqual(200);
    expect(getResult.body).toHaveProperty("name");
    expect(getResult.body.name).toEqual("Dark Fantasy");
    expect(getResult.body.description).toEqual("Old Fantasy description stuff here");

    const result = await request(app)
      .put(`${categoryUrl}/3`)
      .send({
        name: "Light Fantasy",
        description: "Fairy stuff and all that",
      }).set("x-access-token", token);

    expect(result.statusCode).toEqual(200);
    expect(result.body).toHaveProperty("name");
    expect(result.body.name).toEqual("Light Fantasy");
    expect(result.body.description).toEqual("Fairy stuff and all that");
    done();
  });

  it("should not be able to delete an assigned category", async (done) => {
    const result = await request(app).del(`${categoryUrl}/3`)
      .set("x-access-token", token);
    expect(result.statusCode).toEqual(500);
    done();
  });

  it("should be able to delete a disjoint category", async (done) => {
    const createResult = await request(app)
      .post(categoryUrl)
      .send({
        name: "Senior",
        description: "Delete me",
      })
      .set("x-access-token", token);

    expect(createResult.statusCode).toEqual(201);
    expect(createResult.body).toHaveProperty("name");
    expect(createResult.body.name).toEqual("Senior");
    expect(createResult.body).toHaveProperty("id");

    const createResultId = createResult.body.id;

    const result = await request(app).del(`${categoryUrl}/${createResultId}`)
      .set("x-access-token", token);
    expect(result.statusCode).toEqual(204);
    done();
  });
});
