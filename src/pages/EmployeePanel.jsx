import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import TasksTable from "./TasksTable";
import { useUser } from "../contexts/UserContext";

const EmployeePanel = () => {
  const { userInfo } = useUser(); // Fetch logged-in user info from context
  const [tasks, setTasks] = useState([]);

  // Fetch tasks assigned to the logged-in employee
  useEffect(() => {
    if (userInfo) {
      axios
        .get("http://localhost:5000/tasks")
        .then((response) => {
          // Filter tasks based on the logged-in employee's ID
          const employeeTasks = response.data.filter(
            (task) => task.assignedToId === userInfo.id
          );
          setTasks(employeeTasks);
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [userInfo]);

  // Handle task status update
  const handleUpdateTaskStatus = (taskId, status) => {
    axios
      .patch(`http://localhost:5000/tasks/${taskId}`, { status })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, status: response.data.status } : task
          )
        );
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2>Welcome, {userInfo?.firstname || "Employee"}!</h2>
          <p>Here are the tasks assigned to you.</p>
        </Col>
      </Row>

      {/* Task Management Section */}
      <Row>
        <Col>
          <TasksTable
            tasks={tasks}
            onEdit={(taskId) => handleUpdateTaskStatus(taskId, "Completed")}
            onDelete={() => alert("Employees cannot delete tasks.")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeePanel;
