const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { connect, clearDatabase, closeDatabase } = require("./setup");

let token;

jest.setTimeout(30000);

beforeAll(async () => {
  await connect();

  // Ensure user exists
  await request(app)
    .post("/api/v1/auth/signup")
    .send({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "Password123",
    });

  // Login to get JWT
  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({ email: "testuser@example.com", password: "Password123" });

  token = res.body.token;
});

afterEach(async () => await clearDatabase());
afterAll(async () => {
  await closeDatabase();
  await mongoose.connection.close();
});

describe("Blogs API", () => {
  it("should create a new blog (draft)", async () => {
    const res = await request(app)
      .post("/api/v1/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Blog",
        description: "Testing blog creation",
        tags: ["test"],
        body: "This is a test blog",
      });

    expect(res.status).toBe(201);
    expect(res.body.state).toBe("draft");
  });

  // … other tests unchanged …
});
