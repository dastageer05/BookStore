import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import BookCard from "../components/Card";
import { CardGroup } from "react-bootstrap";

import "../App.css"
const OrdersPage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (firebase.isLoggedIn) {
        firebase.fetchMyBooks(firebase.user.uid)?.then((books) => {
          console.log(books);
          setBooks(books);
          setLoading(false);
        });
      } 
    } catch (error) {
      setLoading(false)
    }
  }, [firebase]);

  if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

  return (
    <div className="container mt-5">
  <h3 className="text-center">Books with Orders</h3>
  <div className={loading ? "text-center mt-3" : "mt-3"}>
    {loading ? (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
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
