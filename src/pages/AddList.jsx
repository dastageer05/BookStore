import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-toastify";

const ListingPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
      toast.success("Book Add successfully! ")
      navigate("/user");
    } catch (error) {
      toast.error("fail to add book")
    }
  };

  if (!firebase.isLoggedIn) return (<>
  <h1 className="container mt-5 text-white">Please log in</h1>
  <Button className="ms-5" onClick={() => {navigate("/login")}}>Login page</Button>
  </>)
  
  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit} style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.349)", padding: "10px"}}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Book name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="text"
            placeholder="Enter Price"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cover Pic</Form.Label>
          {/* <Form.Control
            onChange={(e) => setCoverPic(e.target.files[0])}
            type="file"
          /> */}
        </Form.Group>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default ListingPage;