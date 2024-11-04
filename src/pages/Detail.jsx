import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [url, setURL] = useState(`${window.location.origin}/got.webp`);


  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     const imageURL = data.imageURL;
  //     firebase.getImageURL(imageURL).then((url) => setURL(url));
  //   }
  // }, [data]);

  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, data.name, data.price, data.userEmail,  qty);
    console.log("Order Placed", result);
  };

  if (data == null) return <h1>Loading...</h1>;

  return (
    <div className="container mt-3">
      <h3>{data.name}</h3>
      <img src={url} width="40%" height="400px" style={{ borderRadius: "10px" }} />
      <h3>Details</h3>
      <h6>Price: Rs. {data.price}</h6>
      <h6>ISBN Number. {data.isbn}</h6>
      <br />
      <h4>Owner Details</h4>
      <h4>Email: {data.userEmail}</h4>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Qty</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="Number"
          placeholder="Enter Qty"
        />
      </Form.Group>
      <Button onClick={placeOrder} variant="success">
        Buy Now
      </Button>
    </div>
  );
};

export default BookDetailPage;