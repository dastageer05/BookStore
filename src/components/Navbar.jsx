import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { useFirebase } from "../context/Firebase";

const MyNavbar = () => {
  // const firebase = useFirebase();
  // console.log(firebase.user.uid)
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Book Shelf</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/book/list">Add Listing</Nav.Link>
          <Nav.Link href="/book/orders">Orders</Nav.Link>
          <Nav.Link href="/user">Admin</Nav.Link>
          {/* <Nav.Link href={`/user/${firebase.user.uid}`}>Admin</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;