import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { fetchPendingTasks, fetchCompletedTasks } from "./api/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    refreshTasks();
  }, [selectedTab, currentPage]);

  const refreshTasks = async () => {
    const data =
      selectedTab === "pending"
        ? await fetchPendingTasks(currentPage)
        : await fetchCompletedTasks(currentPage);

    setTasks(data.tasks);
    setTotalPages(data.pagination.totalPages);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className=" relative isolate h-screen bg-gray-900 p-10 relative min-h-screen justify-center items-center flex">
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blur-3xl pointer-events-none"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="absolute inset-0 w-full h-full bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 relative z-10">
        {/* Left Side*/}
        <div className="w-full md:w-1/2 flex flex-col">
          <TaskForm refreshTasks={refreshTasks} />
        </div>

        <div className="hidden md:block w-[2px] bg-gray-300"></div>

        {/* Right Side*/}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center mb-4">
            <button
              className={`px-6 py-3 text-sm font-semibold transition-all ${
                selectedTab === "pending"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-l`}
              onClick={() => setSelectedTab("pending")}
            >
              Pending
            </button>
            <button
              className={`px-6 py-3 text-sm font-semibold transition-all ${
                selectedTab === "completed"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } rounded-r`}
              onClick={() => setSelectedTab("completed")}
            >
              Completed
            </button>
          </div>

          <TaskList tasks={tasks} refreshTasks={refreshTasks} />

          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
