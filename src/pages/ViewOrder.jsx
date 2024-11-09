import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import { CardGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "../App.css"
const OrdersPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [booksWithOrders, setBooksWithOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (firebase.isLoggedIn) {
        firebase.fetchMyBooks(firebase.user.uid)?.then((books) => {
          console.log(books);
          setBooks(books);
          setLoading(false);
        firebase.fetchMyBookswithOrders(firebase.user.uid)?.then((books) => {
          setBooksWithOrders(books);
          setLoading(false);
        })
        });
      }
    } catch (error) {
      setLoading(false)
    }
  }, [firebase]);

  if (!firebase.isLoggedIn) return (<>
  <h1 className="container mt-5 text-white">Please log in</h1>
  <Button className="ms-5" onClick={() => {navigate("/login")}}>Login page</Button>
  </>)
  

  return (
    <div className="container mt-5">
  <h3 className="text-center text-white">Books with Orders</h3>
  <div className={loading ? "text-center mt-3" : "mt-3"}>
    {loading ? (
      <div className="spinner-border" role="status">
      </div>
    ) : (
      <CardGroup>
        {booksWithOrders.map((book) => (
          <BookCard
            link={`/books/orders/${book.id}`}
            key={book.id}
            id={book.id}
            {...book}
          />
        ))}
      </CardGroup>
    )}
  </div>
  <h3 className="text-center text-white">My Book Lists</h3>
  <div className={loading ? "text-center mt-3" : "mt-3"}>
    {loading ? (
      <div className="spinner-border" role="status">
      </div>
    ) : (
      <CardGroup>
        {books.map((book) => (
          <BookCard
            link={`/books/orders/${book.id}`}
            key={book.id}
            id={book.id}
            {...book}
          />
        ))}
      </CardGroup>
    )}
  </div>
</div>
  );
};


export default OrdersPage;
