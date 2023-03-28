const request = require("supertest");
const app = require("../server");

describe("GET /", () => {
    it("should say Hello World!", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Hello World!");
    });
});

describe("POST /register", () => {
    it("should say Missing username or password", async () => {
        const res = await request(app).post("/register")
        .send({});
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe("Missing username or password");
    });
});

describe("POST /register", () => {
    it("should say User created", async () => {
        const res = await request(app).post("/register")
        .send({username : "test", password : "test"});
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("User created");
    });
});

describe("POST /register", () => {
    it("should say User already exists", async () => {
        const res = await request(app).post("/register")
        .send({username : "test", password : "test"});
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("User already exists");
    });
});

describe("POST /login", () => {
    it("should say Missing username or password", async () => {
        const res = await request(app).post("/login")
        .send({});
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe("Missing username or password");
    });
});

describe("POST /login", () => {
    it("should say User not found", async () => {
        const res = await request(app).post("/login")
        .send({username : "a", password : "a"});
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe("User not found");
    });
});

describe("POST /login", () => {
    it("should say User found", async () => {
        const res = await request(app).post("/login")
        .send({username : "test", password : "test"});
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("User found");
    });
});

afterAll(done => {
    app.close();
    done();
});