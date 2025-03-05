const taskService = require("../services/taskService");
const taskRepository = require("../repositories/taskRepository");
const sequelize = require("../config/db");
const Task = require("../models/Task");
jest.mock("../repositories/taskRepository");

describe("Task Service Tests", () => {
  afterEach(async () => {
    await Task.destroy({ where: {}, force: true });
  });

  it("should return a list of pending tasks", async () => {
    taskRepository.findAll.mockResolvedValue({
      tasks: [{ id: 1, title: "Test Task", completed: false }],
      pagination: { currentPage: 1, totalPages: 1, totalTasks: 1 },
    });

    const result = await taskService.getTasks("pending", 1, 5);
    expect(result.tasks.length).toBe(1);
    expect(result.tasks[0].completed).toBe(false);
  });

  it("should create a task", async () => {
    taskRepository.create.mockResolvedValue({
      id: 1,
      title: "New Task",
      description: "Task Description",
      completed: false,
    });

    const result = await taskService.createTask("New Task", "Task Description");
    expect(result.id).toBe(1);
    expect(result.title).toBe("New Task");
  });

  it("should update a task", async () => {
    taskRepository.update.mockResolvedValue({
      id: 1,
      title: "Updated Task",
      completed: true,
    });

    const result = await taskService.updateTask(1, { completed: true });
    expect(result.completed).toBe(true);
  });

  it("should return an error if updating a non-existent task", async () => {
    taskRepository.update.mockResolvedValue(null);

    await expect(
      taskService.updateTask(99, { completed: true })
    ).rejects.toThrow("Task not found");
  });

  it("should delete a task", async () => {
    taskRepository.delete.mockResolvedValue(true);

    const result = await taskService.deleteTask(1);
    expect(result).toBe(true);
  });

  it("should return false when deleting a non-existent task", async () => {
    taskRepository.delete.mockResolvedValue(false);

    const result = await taskService.deleteTask(999);
    expect(result).toBe(false);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
