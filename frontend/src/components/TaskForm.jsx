import { useState } from "react";
import PropTypes from "prop-types";
import { createTask } from "../api/taskApi";

const TaskForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    await createTask(title, description);
    setTitle("");
    setDescription("");
    refreshTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 ">
      <h2 className="text-xl font-bold text-white mb-2">Add a Task</h2>
      <input
        type="text"
        name="title"
        className="w-full p-2 mb-2 border rounded bg-gray-100 text-gray-800"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="description"
        className="w-full p-2 mb-2 border rounded bg-gray-100 text-gray-800"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
      >
        Add Task
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  refreshTasks: PropTypes.func.isRequired,
};

export default TaskForm;
