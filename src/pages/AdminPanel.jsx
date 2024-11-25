import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import UsersTable from "./UsersTable";
import TasksTable from "./TasksTable";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Fetch users and tasks from the mock API
  useEffect(() => {
    // Fetch users
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch tasks
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // Handlers for user actions
  const handleEditUser = (userId) => {
    console.log("Edit user:", userId);
    // Add your logic to edit a user
  };

  const handleDeleteUser = (userId) => {
    console.log("Delete user:", userId);
    // Add your logic to delete a user
  };

  // Handlers for task actions
  const handleEditTask = (taskId) => {
    console.log("Edit task:", taskId);
    // Add your logic to edit a task
  };

  const handleDeleteTask = (taskId) => {
    console.log("Delete task:", taskId);
    // Add your logic to delete a task
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, Admin!</h2>
          <p>Manage your users and tasks efficiently.</p>
        </Col>
      </Row>

      {/* User Management Section */}
      <Row className="mb-5">
        <Col>
          <UsersTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </Col>
      </Row>

      {/* Task Management Section */}
      <Row>
        <Col>
          <TasksTable
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
