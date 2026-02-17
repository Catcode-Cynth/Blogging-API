const request = require("supertest");
const app = require("../src/app");
const { connect, clearDatabase, closeDatabase } = require("./setup");

jest.setTimeout(15000); // set timeout globally

beforeAll(async () => {
  await connect();   // ✅ wait for DB connection
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Auth API", () => {
  it("should signup a new user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/signup")
      .send({
        first_name: "Test",
        last_name: "User",
        email: "testuser@example.com",
        password: "Password123"   // plain text, controller will hash
      });

    expect(res.status).toBe(201);   // ✅ expect Created
    expect(res.body.msg).toBeDefined(); // optional: check response message
  });

  it("should signin an existing user", async () => {
    // First signup the user
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        first_name: "Test",
        last_name: "User",
        email: "testuser@example.com",
        password: "Password123"
      });

    // Then signin
    const res = await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "testuser@example.com",
        password: "Password123"
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
