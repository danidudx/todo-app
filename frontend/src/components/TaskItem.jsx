import { MdDelete } from "react-icons/md";
import { updateTaskStatus, deleteTask } from "../api/taskApi";
import PropTypes from "prop-types";

const TaskItem = ({ task, refreshTasks }) => {
  const handleComplete = async () => {
    await updateTaskStatus(task.id);
    refreshTasks();
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    refreshTasks();
  };

  return (
    <div className="flex  items-center  justify-between bg-purple-200 p-4 rounded-lg shadow mb-4">
      <div className="pr-2">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>
      <div className="flex gap-2 items-center">
        {task.completed ? (
          <span className="px-4 py-2 text-white bg-green-500 rounded-full text-sm">
            Completed
          </span>
        ) : (
          <button
            data-testid="done-button"
            onClick={handleComplete}
            className="px-4 py-2 border rounded text-gray-800 bg-white hover:bg-gray-300"
          >
            Done
          </button>
        )}
        <MdDelete
          data-testid="delete-icon"
          className="text-red-600 cursor-pointer text-xl"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  refreshTasks: PropTypes.func.isRequired,
};

export default TaskItem;
