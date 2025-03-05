const Task = require("../models/Task");

class TaskRepository {
  async findAll(completed, page = 1, limit = 5) {
    const whereCondition = completed !== undefined ? { completed } : {};

    const totalTasks = await Task.count({ where: whereCondition });

    const tasks = await Task.findAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    return {
      tasks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalTasks / limit),
        totalTasks,
      },
    };
  }

  async create(title, description) {
    return await Task.create({ title, description });
  }

  async update(id, updates) {
    const task = await Task.findByPk(id);
    if (!task) return null;

    await task.update(updates);
    return task;
  }

  async delete(id) {
    const task = await Task.findByPk(id);
    if (!task) return null;

    await task.destroy();
    return task;
  }
}

module.exports = new TaskRepository();
