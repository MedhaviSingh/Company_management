import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import TasksTable from "./TasksTable";
import { useUser } from "../contexts/UserContext";
import "./Admin.css";

const EmployeePanel = () => {
  const { userInfo } = useUser();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (userInfo) {
      axios
        .get("http://localhost:5000/tasks")
        .then((response) => {
          const employeeTasks = response.data.filter((task) => {
            return task.assignedToId === userInfo.id;
          });          
          setTasks(employeeTasks);
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [userInfo]);

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
          <h2 class="text">Welcome, {userInfo?.firstname || "Employee"}!</h2>
          <p class="para">Here are the tasks assigned to you.</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <TasksTable
            tasks={tasks}
            onEdit={(taskId) => { handleUpdateTaskStatus(taskId.id, "Completed")}}
            onDelete={() => alert("Employees cannot delete tasks.")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeePanel;
