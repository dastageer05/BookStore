import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();
  const navigate = useNavigate();

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
   try {
     const result = await firebase.placeOrder(params.bookId, data.name, data.price, data.userEmail,  qty);
     console.log("Order Placed", result);
   } catch (err) {
      console.log("err", err);
      toast.error("Please login");
   } finally {
      navigate("/user")
   }
  };

  if (data == null) return <h1>Loading...</h1>;

  return (
    <div className="container mt-5" style={{ color: "white", backgroundColor: "rgba(0, 0, 0, 0.349)", padding: "20px", width:"25rem"}}>
      <h3 style={{display:"flex",justifyContent:"center"}}>{data.name}</h3>
      <img src={url} height="400px" width="fit-content" style={{ borderRadius: "10px"}} />
      <h3>Details</h3>
      <h6>Price: Rs. {data.price}</h6>
      <h6>ISBN Number. {data.isbn}</h6>
      <br />
      <h5>Owner Details</h5>
      <h5>Email: {data.userEmail}</h5>
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