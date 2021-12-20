import { boot } from "../backend";
import { App } from "../backend/app";
import request from "supertest";

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

describe("User e2e", () => {
  it("register - error", async () => {
    const res = await request(application.app)
      .post("/register")
      .send({ email: "a@a.ru", password: "1" });

    expect(res.statusCode).toBe(422);
  });
  it("login - success", async () => {
    const res = await request(application.app)
      .post("/login")
      .send({ email: "a@a.ru", password: "qwerty" });

    expect(res.body.jwt).not.toBeUndefined();
  });
  it("login - error", async () => {
    const res = await request(application.app)
      .post("/login")
      .send({ email: "a@a.ru", password: "wrong" });

    expect(res.statusCode).toBe(401);
  });
  it("Info - success", async () => {
    const login = await request(application.app)
      .post("/login")
      .send({ email: "a@a.ru", password: "qwerty" });
    const res = await request(application.app)
      .get("/info")
      .set("Authorization", `Bearer ${login.body.jwt}`);

    expect(res.body.email).toBe("a@a.ru");
  });
  it("Info - error", async () => {
    const login = await request(application.app)
      .post("/login")
      .send({ email: "a@a.ru", password: "qwerty" });
    const res = await request(application.app)
      .get("/info")
      .set("Authorization", `Bearer wrong`);

    expect(res.statusCode).toBe(401);
  });
});

afterAll(() => {
  application.close();
});
