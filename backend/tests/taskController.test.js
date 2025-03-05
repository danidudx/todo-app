const taskController = require("../controllers/taskController");
const taskService = require("../services/taskService");
const httpMocks = require("node-mocks-http");
const sequelize = require("../config/db");
const Task = require("../models/Task");

jest.mock("../services/taskService");

describe("Task Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  afterEach(async () => {
    await Task.destroy({ where: {}, force: true });
  });

  it("should return a list of tasks", async () => {
    const mockTasks = [
      { id: 1, title: "Task 1", completed: false },
      { id: 2, title: "Task 2", completed: true },
    ];
    taskService.getTasks.mockResolvedValue(mockTasks);

    req.query = { status: "pending", page: 1, limit: 5 };

    await taskController.getTasks(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockTasks);
  });

  it("should create a new task", async () => {
    const mockTask = {
      id: 1,
      title: "Test Task",
      description: "Description",
      completed: false,
    };

    taskService.createTask.mockResolvedValue(mockTask);

    req.body = { title: "Test Task", description: "Description" };

    await taskController.createTask(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual(mockTask);
  });

  it("should update a task", async () => {
    const updatedTask = { id: 1, title: "Test Task", completed: true };
    taskService.updateTask.mockResolvedValue(updatedTask);

    req.params = { id: "1" };
    req.body = { completed: true };

    await taskController.updateTask(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(updatedTask);
  });

  it("should return 404 if updating a non-existent task", async () => {
    taskService.updateTask.mockResolvedValue(null);

    req.params = { id: "999" };
    req.body = { completed: true };

    await taskController.updateTask(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: "Task not found" });
  });

  it("should delete a task", async () => {
    taskService.deleteTask.mockResolvedValue(true);

    req.params = { id: "1" };

    await taskController.deleteTask(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({
      message: "Task deleted successfully",
    });
  });

  it("should return 404 if deleting a non-existent task", async () => {
    taskService.deleteTask.mockResolvedValue(false);

    req.params = { id: "999" };

    await taskController.deleteTask(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: "Task not found" });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
