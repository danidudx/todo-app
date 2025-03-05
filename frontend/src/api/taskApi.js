import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/tasks`;

export const fetchPendingTasks = async (page = 1) => {
  const response = await axios.get(
    `${API_URL}/?status=pending&page=${page}&limit=5`
  );
  return response.data;
};

export const fetchCompletedTasks = async (page = 1) => {
  const response = await axios.get(
    `${API_URL}/?status=completed&page=${page}&limit=5`
  );
  return response.data;
};

export const createTask = async (title, description) => {
  const response = await axios.post(API_URL, { title, description });
  return response.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const updateTaskStatus = async (id) => {
  await axios.patch(`${API_URL}/${id}`, { completed: true });
};
