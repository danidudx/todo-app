const taskRepository = require("../repositories/taskRepository");

class TaskService {
  async getTasks(completed, page = 1, limit = 5) {
    return await taskRepository.findAll(completed, page, limit);
  }

  async createTask(title, description) {
    return await taskRepository.create(title, description);
  }

  async updateTask(id, updates) {
    const task = await taskRepository.update(id, updates);

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async deleteTask(id) {
    const deletedTask = await taskRepository.delete(id);
    return deletedTask;
  }
}

module.exports = new TaskService();
