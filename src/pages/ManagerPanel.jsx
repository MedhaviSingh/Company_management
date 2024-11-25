import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import UsersTable from "./UsersTable";
import TasksTable from "./TasksTable";

const ManagersPanel = () => {
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

  // Handlers for user actions (restricted for the manager)
  const handleEditUser = (userId) => {
    console.log("Edit user:", userId);
    // Managers might only be allowed to view users or have limited edit capabilities
    alert("Manager edit functionality for users is under development.");
  };

  const handleDeleteUser = () => {
    alert("Managers cannot delete users.");
  };

  // Handlers for task actions
  const handleEditTask = (taskId) => {
    console.log("Edit task:", taskId);
    // Managers can edit tasks (e.g., reassign or change task status)
  };

  const handleDeleteTask = () => {
    alert("Managers cannot delete tasks.");
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, Manager!</h2>
          <p>Here’s an overview of the users and tasks assigned to the team.</p>
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

export default ManagersPanel;
