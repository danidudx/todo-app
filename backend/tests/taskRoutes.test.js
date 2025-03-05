const request = require("supertest");
const { app, server } = require("../app");
const sequelize = require("../config/db");
const Task = require("../models/Task");

describe("Task API Routes", () => {
  let taskId;

  beforeAll(async () => {
    await Task.destroy({ where: {}, force: true });
  });

  beforeEach(async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task", description: "Description" });

    taskId = response.body.id;
  });

  afterEach(async () => {
    await Task.destroy({ where: {}, force: true });
  });

  afterAll(async () => {
    if (server && server.listening) {
      await new Promise((resolve) => server.close(resolve));
    }
    await sequelize.close();
  });

  it("should create a new task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "New Task", description: "Another Task" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should fetch pending tasks", async () => {
    const response = await request(app).get("/api/tasks?status=pending");
    expect(response.status).toBe(200);
    expect(response.body.tasks).toBeInstanceOf(Array);
  });

  it("should update a task", async () => {
    const response = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({ completed: true });

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  it("should return an error for non-existent task update", async () => {
    const response = await request(app)
      .patch("/api/tasks/999")
      .send({ completed: true });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Task not found");
  });

  it("should delete a task", async () => {
    const response = await request(app).delete(`/api/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted successfully");
  });

  it("should return 404 if deleting a non-existent task", async () => {
    const response = await request(app).delete("/api/tasks/999");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Task not found");
  });
});
