import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

const Users = () => {
  const { userInfo, setUserInfo } = useUser(); // Access logged-in user info
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [updatedInfo, setUpdatedInfo] = useState(userInfo); // Form data

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update user info
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/users/${userInfo.id}`, updatedInfo)
      .then((res) => {
        setUserInfo(res.data); // Update context with new user data
        setIsEditing(false); // Exit edit mode
      })
      .catch((err) => console.error("Error updating user info:", err));
  };

  return (
    <div className="users-section" style={{ backgroundColor: "#f5f7fa", padding: "2rem" }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm border-0" style={{ borderRadius: "10px" }}>
              <Card.Body>
                <h3 className="text-center mb-4">Your Profile</h3>
                <Form onSubmit={handleUpdate}>
                  {/* Name Field */}
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={updatedInfo.name || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>

                  {/* Email Field (read-only) */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={userInfo.email || ""}
                      disabled
                      placeholder="Email cannot be changed"
                    />
                  </Form.Group>

                  {/* Role Field */}
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      value={updatedInfo.role || ""}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your role"
                      required
                    />
                  </Form.Group>

                  {/* Buttons */}
                  {isEditing ? (
                    <div className="d-flex justify-content-between">
                      <Button
                        type="submit"
                        variant="success"
                        className="w-45"
                      >
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-45"
                        onClick={() => {
                          setUpdatedInfo(userInfo); // Revert changes
                          setIsEditing(false); // Exit edit mode
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="primary"
                      className="w-100"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Users;
