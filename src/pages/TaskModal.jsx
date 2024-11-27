import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const TaskModal = ({ show, onHide, onSave, currentTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    assignedTo: "",
    status: "",
  });

  useEffect(() => {
    if (currentTask) {
      setFormData({
        title: currentTask.title,
        assignedTo: currentTask.assignedTo,
        status: currentTask.status,
      });
    } else {
      setFormData({
        title: "",
        assignedTo: "",
        status: "",
      });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (currentTask) {
        await axios.put(`http://localhost:5000/tasks/${currentTask.id}`, {
          ...formData,
        });
      } else {
        await axios.post("http://localhost:5000/tasks", formData);
      }
      onSave(); 
      onHide(); 
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{currentTask ? "Edit Task" : "Add Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {currentTask ? "Save Changes" : "Add Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskModal;
