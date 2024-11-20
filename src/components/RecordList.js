import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const base_url =
  process.env.REACT_APP_NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_BASE_URL
    : process.env.REACT_APP_SERVER_BASE_URL;

const RecordList = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get(`${base_url}/record/`)
      .then((response) => setRecords(response.data))
      .catch((error) => console.error("Error fetching records:", error));
  }, []);

  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title className="mb-4 text-center">User Records</Card.Title>
          <Table striped bordered hover responsive>
            <thead className="bg-primary text-white">
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Level</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>{record.name}</td>
                  <td>{record.position}</td>
                  <td>{record.level}</td>
                  <td>
                    <Link
                      to={`/view/${record._id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/edit/${record._id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <FaEdit />
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteRecord(record._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Row className="mt-4">
        <Col className="text-center">
          <Link to="/create" className="btn btn-primary">
            Add New Record
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default RecordList;
