import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SpinnerLoad from "../components/SpinnerLoad";
import FormText from "react-bootstrap/esm/FormText";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Card } from "@material-ui/core";
import "../css/css-pages/register.css";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Display error messages using toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle form submission for login
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.email && formValue.password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  // Update form fields
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <Container className="reg-con-wrap d-flex flex-column min-vh-100">
      <Card className="reg-card-wrap">
        <Form onSubmit={handleSubmit}>
          <IoPersonCircleSharp className="sign-icon" />
          <h1>Sign in</h1>

          {/* Email input field */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              name="email"
              onChange={onInputChange}
              placeholder="Email*"
            />
          </Form.Group>

          {/* Password input field */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              name="password"
              onChange={onInputChange}
              placeholder="Password*"
              autoComplete="off"
            />
          </Form.Group>

          {/* Submit button */}
          <div className="d-grid gap-2">
            <Button type="submit">
              {loading && <SpinnerLoad />}
              Login
            </Button>
          </div>

          {/* Link to registration page */}
          <FormText>
            <Link to={"/register"}>
              <p className="link-login">Don't Have an account? Sign up</p>
            </Link>
          </FormText>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
