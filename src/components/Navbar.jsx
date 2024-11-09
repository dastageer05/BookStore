import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"

// import { useFirebase } from "../context/Firebase";
const MyNavbar = () => {
  // const firebase = useFirebase();
  // console.log(firebase.user.uid)
  return (
    <Navbar variant="dark">
    <Container style={{ background: "rgba(0, 0, 0, 0.749)", padding: "10px 40px", marginTop: "5px" }}>
      <Navbar.Brand as={Link} to="/">Book Shelf</Navbar.Brand>
      <Nav className="ms-auto d-flex align-items-center">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/book/list">Add Listing</Nav.Link>
        <Nav.Link as={Link} to="/book/orders">Orders</Nav.Link>
        <Nav.Link as={Link} to="/user">User</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  );
};

export default MyNavbar;