import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Form } from "react-bootstrap";

const base_url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_BASE_URL
    : process.env.REACT_APP_SERVER_BASE_URL;

const RecordForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${base_url}/record/`, formData)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error adding record:", error));
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            Create New Record
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="text"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Create Record
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecordForm;
