const taskRepository = require("../repositories/taskRepository");
const Task = require("../models/Task");
const sequelize = require("../config/db");

describe("Task Repository Tests", () => {
  beforeEach(async () => {
    await Task.destroy({ where: {}, force: true });
  });

  it("should create a task", async () => {
    const task = await taskRepository.create("Test Task", "Test Description");
    expect(task.id).toBeDefined();
    expect(task.title).toBe("Test Task");
  });

  it("should find tasks by status", async () => {
    await taskRepository.create("Completed Task", "Completed task description");
    const tasks = await taskRepository.findAll("false", 1, 5);
    expect(tasks.tasks.length).toBeGreaterThan(0);
  });

  it("should update a task", async () => {
    const task = await taskRepository.create(
      "Task to Update",
      "Some description"
    );

    const updatedTask = await taskRepository.update(task.id, {
      completed: true,
    });

    expect(updatedTask.completed).toBe(true);
  });

  it("should return null when task does not exist for update", async () => {
    const updatedTask = await taskRepository.update(999, { completed: true });
    expect(updatedTask).toBeNull();
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
