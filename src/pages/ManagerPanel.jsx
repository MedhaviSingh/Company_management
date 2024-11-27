import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import UsersTable from "./UsersTable";
import TasksTable from "./TasksTable";
import TaskModal from "./TaskModal";
import "./Admin.css";
const ManagersPanel = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEditUser = () => {
    alert("Managers can only view user details.");
  };

  const handleDeleteUser = () => {
    alert("Managers cannot delete users.");
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setCurrentTask(taskId); 
    setShowTaskModal(true); 
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks(); 
      alert("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const handleAddTask = () => {
    setCurrentTask(null); 
    setShowTaskModal(true);
  };

  const handleSaveTask = async () => {
    fetchTasks(); 
    setShowTaskModal(false); 
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2 class="text">Welcome, Manager!</h2>
          <p class="para">Here’s an overview of the users and tasks assigned to the team.</p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          <UsersTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </Col>
      </Row>

      <Row>
        <Col>
            <Button variant="primary" onClick={handleAddTask} className="mb-3">
              Add Task
            </Button>
          <TasksTable
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </Col>
      </Row>

      {showTaskModal && (
        <TaskModal
          show={showTaskModal}
          onHide={() => setShowTaskModal(false)}
          onSave={handleSaveTask}
          currentTask={currentTask} 
        />
      )}
    </Container>
  );
};

export default ManagersPanel;
