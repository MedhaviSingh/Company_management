import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { setCookie } from "../utils/common";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import  regform  from "../form.jpeg"
import "./login.css"

const Login = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (userInfo) navigate("/dashboard");
  }, [userInfo]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    setError(false);
    setLoading(true);
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setLoading(false);
    } else {

      axios
        .get("http://localhost:5000/users") 
        .then((res) => {
          const foundUser = res.data.find(
            (user) =>
              user.email === formData.email.trim() &&
              user.password === formData.password.trim()
          );
  
          if (foundUser) {
            setCookie("_USER_AUTH_", JSON.stringify(foundUser));
            setUserInfo(foundUser); 
            navigate("/dashboard"); 
          } else {
            setError(true);
          }
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          setError(true);
          setLoading(false);
        });
    }
  
    setValidated(true); 
  };
  

  return (
    <div className="login-section align-content-center">
      <Container>
        <Row >
          <Col xl={4} lg={5} md={7} xs={12}>
            <div className="login-box rounded  shadow-sm ">
              
              
              <Form noValidate validated={validated} onSubmit={handleSubmit} className="Form">
              <h3 className="h3"> Sign In </h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="labeltext">Email address</Form.Label>
                  <Form.Control 
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Enter email"
                    required
                    style={{ borderRadius: '10px', borderColor:'darkblue', borderWidth: '3px' }} // Custom style
                    
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3 position-relative"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="labeltext">Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    required
                    style={{ borderRadius: '10px', borderColor:'darkblue', borderWidth: '3px' }} 
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


                <Button variant="primary" type="submit" disabled={isLoading} className="button">
                  {isLoading ? "loading..." : "Submit"}
                </Button>
              </Form>
              <div className="imgdiv">
                <img src={regform} className="img">
                </img>
                <h2 className="h2">Welcome</h2>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
