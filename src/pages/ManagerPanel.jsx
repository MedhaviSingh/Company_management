import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import UsersTable from "./UsersTable";
import TasksTable from "./TasksTable";
import TaskModal from "./TaskModal";

const ManagersPanel = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch users and tasks from the mock API
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

  // Handlers for user actions (restricted for the manager)
  const handleEditUser = () => {
    alert("Managers can only view user details.");
  };

  const handleDeleteUser = () => {
    alert("Managers cannot delete users.");
  };

  // Handlers for task actions
  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setCurrentTask(taskId); // Pass the task to the modal for editing
    setShowTaskModal(true); // Open the modal
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      fetchTasks(); // Refresh the task list after deletion
      alert("Task deleted successfully.");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const handleAddTask = () => {
    setCurrentTask(null); // Clear currentTask to add a new task
    setShowTaskModal(true);
  };

  const handleSaveTask = async () => {
    fetchTasks(); // Refresh the task list after adding or editing a task
    setShowTaskModal(false); // Close the modal
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

      {/* Task Modal for Adding/Editing Tasks */}
      {showTaskModal && (
        <TaskModal
          show={showTaskModal}
          onHide={() => setShowTaskModal(false)}
          onSave={handleSaveTask}
          currentTask={currentTask} // Pass the task to edit or null for adding
        />
      )}
    </Container>
  );
};

export default ManagersPanel;
