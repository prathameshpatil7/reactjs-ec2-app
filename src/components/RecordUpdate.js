import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Container, Form } from "react-bootstrap";

const base_url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_BASE_URL
    : process.env.REACT_APP_SERVER_BASE_URL;

const RecordUpdate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();

  // Fetch the record data to prefill the form
  useEffect(() => {
    axios
      .get(`${base_url}/record/${id}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error("Error fetching record:", error));
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`${base_url}/record/${id}`, formData)
      .then(() => navigate(`/record/${id}`))
      .catch((error) => console.error("Error updating record:", error));
  };

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title className="mb-4 text-center">Update Record</Card.Title>
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
                Update Record
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecordUpdate;
