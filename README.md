# **Todo App - Full Stack Application**

## **Overview**

This is a full-stack Todo application with **backend**, **frontend**, and a **PostgreSQL database**. The entire application is containerized using **Docker** for both **development** and **testing** environments. The app provides functionalities for **creating**, **updating**, **deleting**, and **fetching tasks**. It uses **Sequelize** for database interactions and **Express** for backend routing. **Jest** is used for testing the backend, including service, repository, and controller tests.

---

## **Tech Stack**

- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express, Sequelize, PostgreSQL
- **Testing**: Jest, Supertest, Mocking
- **Database**: PostgreSQL (dockerized)
- **Deployment**: Docker, Docker Compose
- **Environment Variables**: `.env`

# **Summary of Commands for Todo App**

## **1. Clone the Repository**

Clone the repository to your local machine:

`git clone https://github.com/danidudx/todo-app`
`cd todo-app`

To build and start the application containers for Frontend, Backend, and PostgreSQL:

`docker-compose up --build`

Running Tests

`docker-compose exec backend sh`
`npm test`

Running End-to-End (E2E) Tests with Cypress

`cd frontend`

`npx cypress run`

This will run Cypress tests in headless mode. If you want to see the tests in real-time with the Cypress Test Runner, use:

`npx cypress open`

# **Main Features of the Todo App**

## **1. SOLID Principles**

The **Todo App** follows the **SOLID principles** to ensure the code is **clean**, **maintainable**, and **scalable**.

---

## **2. CRUD Operations for Tasks**

The application provides **CRUD (Create, Read, Update, Delete)** functionality for managing tasks. These operations are implemented using the **Task API** endpoints.

- **Create a Task**:

  - **POST `/tasks`**: Creates a new task with a title and description.
  - **Example Request**:

  ```json
  POST /tasks
  {
    "title": "New Task",
    "description": "Description of the new task"
  }
  ```

  - **Response**:

  ```json
  {
    "id": 1,
    "title": "New Task",
    "description": "Description of the new task",
    "completed": false,
    "createdAt": "2025-03-01T00:00:00Z",
    "updatedAt": "2025-03-01T00:00:00Z"
  }
  ```

- **Read Tasks**:

  - **GET `/tasks`**: Retrieves a list of tasks, with support for **pagination** and **status filtering**.
  - **Example Request**:

  ```text
  GET /tasks?status=pending&page=1&limit=5
  ```

- **Update a Task**:

  - **PATCH `/tasks/:id`**: Updates a task by its ID (e.g., mark it as completed).
  - **Example Request**:

  ```json
  PATCH /tasks/1
  {
    "completed": true
  }
  ```

- **Delete a Task**:
  - **DELETE `/tasks/:id`**: Deletes a task by its ID.
  - **Example Request**:
  ```text
  DELETE /tasks/1
  ```

---

## **3. Pagination in the Backend**

The **backend** supports **pagination** for fetching tasks to optimize performance when dealing with large datasets. Pagination is available in the **`GET /tasks`** route.

### **Query Parameters for Pagination**:

- **`status`**: Filters tasks by completion status (`completed` or `pending`).
- **`page`**: The page number to fetch. Default is `1`.
- **`limit`**: The number of tasks to return per page. Default is `5`.

#### **Example Request**:

---

## **Setup Instructions**

### **1. Clone the Repository**

Clone the repository to your local machine:

`git clone https://github.com/danidudx/todo-app`

`cd todo-app`

## 2. Docker Setup (for PostgreSQL and Services)

This application is fully containerized using Docker. Make sure Docker and Docker Compose are installed on your system.

Run Docker Containers
Run the following command to build and start the application containers:

`docker-compose up --build`

This will:

- Build the Docker containers for Frontend, Backend, and PostgreSQL.

- Start the containers in detached mode.

- The Backend API will be available at http://localhost:5000.

- The Frontend application will be available at http://localhost:3000.

## Running Tests

###### Test Structure

The backend is tested using Jest. Tests are written to cover the service, repository, and controller layers, ensuring the core logic, database interactions, and HTTP responses work correctly.

To run the tests for the backend, run the following command:

`docker-compose exec backend sh`

`npm test`

This will:

- Run the tests in the backend container.

##### Test Types

1. Unit Tests: Test isolated pieces of functionality (e.g., services and repositories).
2. Integration Tests: Test combinations of service, repository, and controller layers.
3. E2E Tests: (End-to-End tests) simulate real-world user behavior by interacting with the backend API and frontend.

###### To run the E2E Tests

**command:**

`cd frontend`

`npx cypress run`
