import React, { useEffect, useState } from "react";
import CardGroup from "react-bootstrap/CardGroup";

import BookCard from "../components/Card";
import { useFirebase } from "../context/Firebase";

const HomePage = () => {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center text-white">Books Available on this Website</h3>
      <CardGroup>
        {books.map((book) => (
          <BookCard
            link={`/book/view/${book.id}`}
            key={book.id}
            id={book.id}
            {...book.data()}
          />
        ))}
      </CardGroup>
    </div>
  );
};

export default HomePage;