import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const UserModal = ({ show, onHide, onSave, currentUser }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    status: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        email: currentUser.email, 
        role: currentUser.role,
        status: currentUser.status,
        password: "", 
      });
    } else {
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        status: "",
        password: "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (currentUser) {
        await axios.put(`http://localhost:5000/users/${currentUser.id}`, {
          ...formData,
        });
      } else {
        await axios.post("http://localhost:5000/users", formData);
      }
      onSave(); 
      onHide(); 
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{currentUser ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {!currentUser && (
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
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
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!currentUser}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {currentUser ? "Save Changes" : "Add User"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
