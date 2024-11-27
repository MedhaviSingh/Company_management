import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import UsersTable from "./UsersTable";
import TasksTable from "./TasksTable";
import UserModal from "./UserModal";
import TaskModal from "./TaskModal";
import "./Admin.css";
const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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

  const handleAddUser = () => {
    setCurrentUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setShowTaskModal(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2 class="text">Welcome, Admin!</h2>
          <p class="para">Manage your users and tasks efficiently.</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Button onClick={handleAddUser} className="mb-3">
            Add User
          </Button>
          <UsersTable
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleAddTask} className="mb-3">
            Add Task
          </Button>
          <TasksTable
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </Col>
      </Row>
      <UserModal
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
        onSave={fetchUsers}
        currentUser={currentUser}
      />
      <TaskModal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        onSave={fetchTasks}
        currentTask={currentTask}
      />
    </Container>
  );
};

export default AdminPanel;
