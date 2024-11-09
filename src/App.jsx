import { Routes, Route } from "react-router-dom";
import { useFirebase } from "./context/Firebase";
// Components
import MyNavbar from "./components/Navbar";
import Notification from "./pages/Notification";
// Pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/AddList";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/BookDetail";
import OrdersPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetail";
import User from "./pages/User";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const firebase = useFirebase();
  const [currUser, setCurrUser] = useState(false);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      setCurrUser(true);
    }
  }, [firebase]);

  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<OrdersPage />} />
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
        <Route path="/user" element={<User /> }></Route>
      </Routes>
      <Notification />
    </div>
  );
}

export default App;