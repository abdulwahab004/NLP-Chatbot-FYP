import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h2>Signup</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3 w-100">Signup</Button>
      </Form>
    </Container>
  );
};

export default Signup;
