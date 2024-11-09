import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

import { useFirebase } from "../context/Firebase";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await firebase.singinUserWithEmailAndPass(email, password);
    navigate("/user")
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container mt-5 text-white">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      <Button onClick={firebase.signinWithGoogle} variant="danger" className="mt-2">
        Signin with Google
      </Button>
      <h1 className="mt-2 mb-2">OR</h1>
      <Button onClick={() => {navigate("/register")}} variant="primary">
        Sign Up
      </Button>
    </div>
  );
};

export default LoginPage;