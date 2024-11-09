import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../App.css";

function User() {
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
    setData(firebase.user);
    fetchUserOrders(firebase.user.uid);
    }
  }, [firebase]);

  const fetchUserOrders = async (userId) => {
    try {
      const ordersSnapshot = await firebase.getUserOrders(userId);
      setOrders(ordersSnapshot.docs);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  const handleDelete= async (orderId, bookId) => {
    try {
      console.log(orderId)
      await firebase.deletePlaceOrder(orderId, bookId);
      fetchUserOrders(firebase.user.uid);
    } catch (error) {
      console.log("deletion error", error);
    }
  }

  return (
    <div className="container mt-3 text-white">
      {!firebase.isLoggedIn ? (
        <div className="container mt-5">
          <h1>Please log in</h1>
          <Button onClick={() => {navigator("/login")}}>Login page</Button>
        </div>
      ) : (
        <>
        <h3>Profile</h3>
        <p>Email: {data?.email || "Email not available"}</p>
        <h3>Ordered Books</h3>
        <div className="container mt-3">
          {orders.length > 0 ? (
            orders.map((order) => {
              const orderData = order.data();
              return (
                <div
                  key={order.id}
                  className="mt-2"
                  style={{ border: "1px solid", padding: "10px" }}
                >
                  <h4>Book Title: {orderData.bookName}</h4>
                  <h5>Qty: {orderData.qty}</h5>
                  <h5>Author Email: {orderData.author}</h5>
                  <h6>Price: {orderData.bookPrice}</h6>
                  <Button onClick={() => handleDelete(order.id, orderData.bookId)} variant="warning" className="mt-2">
                    Delete Order
                  </Button>
                </div>
              );
            })
          ) : (
            <p>No orders found.</p>
          )}
        </div>
        <Button onClick={() => firebase.signout()} variant="danger" className="mt-2">
        Log Out
      </Button>
        </>
      )}
     
    </div>
  );
}

export default User;
