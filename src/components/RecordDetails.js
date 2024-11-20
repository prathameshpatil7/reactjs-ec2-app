import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
const base_url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_BASE_URL
    : process.env.REACT_APP_SERVER_BASE_URL;

const RecordDetails = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${base_url}/record/${id}`)
      .then((response) => setRecord(response.data))
      .catch((error) => console.error("Error fetching record:", error));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`${base_url}/record/${id}`)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error deleting record:", error));
  };

  return record ? (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title className="mb-4 text-center">Record Details</Card.Title>
          <Row>
            <Col md={4} className="text-md-end fw-bold">
              Name:
            </Col>
            <Col md={8}>{record.name}</Col>
          </Row>
          <Row className="mt-3">
            <Col md={4} className="text-md-end fw-bold">
              Position:
            </Col>
            <Col md={8}>{record.position}</Col>
          </Row>
          <Row className="mt-3">
            <Col md={4} className="text-md-end fw-bold">
              Level:
            </Col>
            <Col md={8}>{record.level}</Col>
          </Row>
        </Card.Body>
      </Card>
      <Row className="mt-4">
        <Col className="text-center">
          <Link to="/" className="btn btn-primary me-2">
            Back to List
          </Link>
          <Link to={`/edit/${record._id}`} className="btn btn-warning">
            Edit Record
          </Link>
        </Col>
      </Row>
    </Container>
  ) : (
    <p>Loading...</p>
  );
};

export default RecordDetails;
