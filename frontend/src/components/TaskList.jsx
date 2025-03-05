import TaskItem from "./TaskItem";
import PropTypes from "prop-types";

const TaskList = ({ tasks, refreshTasks }) => {
  return (
    <div className="p-4 ">
      {tasks.length === 0 ? (
        <p className="text-gray-600 text-center">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} refreshTasks={refreshTasks} />
        ))
      )}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  refreshTasks: PropTypes.func.isRequired,
};

export default TaskList;
