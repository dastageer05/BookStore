import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import "../App.css";

function User() {
  const firebase = useFirebase();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

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

  return (
    <div className="container mt-3">
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
              </div>
            );
          })
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default User;
