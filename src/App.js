import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import RecordList from "./components/RecordList";
import RecordForm from "./components/RecordForm";
import RecordDetails from "./components/RecordDetails";
import RecordUpdate from "./components/RecordUpdate";

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 sticky-top">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-white text-decoration-none fw-bold">
              MERN User Records
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                {" "}
                <Link to="/create" className="text-white text-decoration-none">
                  Add New
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<RecordList />} />
        <Route path="/create" element={<RecordForm />} />
        <Route path="/view/:id" element={<RecordDetails />} />
        <Route path="/edit/:id" element={<RecordUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
