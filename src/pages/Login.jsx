import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { setCookie } from "../utils/common";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUser();
  //state to manage password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (userInfo) navigate("/dashboard");
  }, [userInfo]);

  //State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Fuction to handle change in form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    // update formdata state with new values
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //fuction to handle form submission
  const handleSubmit = (event) => {
    setError(false);
    setLoading(true);
    const form = event.currentTarget;
    event.preventDefault();
  
    // Check form validity
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setLoading(false);
    } else {
      // Attempt login with mock JSON server
      axios
        .get("http://localhost:5000/users") // Fetch all users from the mock JSON server
        .then((res) => {
          // Check if the user exists and credentials match
          const foundUser = res.data.find(
            (user) =>
              user.email === formData.email.trim() &&
              user.password === formData.password.trim()
          );
  
          if (foundUser) {
            // User exists, log them in
            setCookie("_USER_AUTH_", JSON.stringify(foundUser)); // Store user info in a cookie
            setUserInfo(foundUser); // Update the user context
            navigate("/dashboard"); // Redirect to dashboard
          } else {
            // Invalid email or password
            setError(true);
          }
          setLoading(false); // Stop the loading spinner
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setError(true);
          setLoading(false);
        });
    }
  
    setValidated(true); // Mark the form as validated
  };
  

  return (
    <div className="login-section align-content-center">
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={5} md={7} xs={12}>
            <div className="login-box rounded p-4 shadow-sm bg-light">
              <h3 className="mb-4"> Sign In </h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Enter email"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 position-relative"
                  controlId="formBasicPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password.
                  </Form.Control.Feedback>
                  <span
                    className="position-absolute top-50 end-0 me-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "hide" : "show"}
                  </span>
                </Form.Group>
                {error ? <p className="text-danger">User email or password is incorrect</p> : ""}


                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? "loading..." : "Submit"}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
