import request from "supertest";

const baseURL = "http://localhost:3000";
describe("/sms-verification api tests", () => {
  it("should return 422 (without phone number)", async () => {
    const response = await request.agent(baseURL).get("/api/auth/sms-verification");
    expect(response.statusCode).toBe(422);
    expect(response.body.success).toBe(false);
  });

  it("should return 422 (invalid phone number)", async () => {
    const phoneNumber = Math.ceil(Math.random() * 100000000);
    const response = await request
      .agent(baseURL)
      .get("/api/auth/sms-verification?phoneNumber=" + phoneNumber);
    expect(response.statusCode).toBe(422);
    expect(response.body.success).toBe(false);
  });

  it("should return 201 (valid phone number)", async () => {
    const phoneNumber = "09113344123";
    const response = await request
      .agent(baseURL)
      .get("/api/auth/sms-verification?phoneNumber=" + phoneNumber);
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
