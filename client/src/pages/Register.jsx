import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { inputsValidations } from "../validators/formValidations";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerForm } from "../redux/features/authSlice";
import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SpinnerLoad from "../components/SpinnerLoad";
import FormText from "react-bootstrap/esm/FormText";
import { IoPersonCircleSharp } from "react-icons/io5";
import "../css/css-pages/register.css";

function RegisterTest() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { loading, error } = useSelector((state) => state.auth);

   // react-hook-form setup with yup validation
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm({
     resolver: yupResolver(inputsValidations),
   });

   // Display error messages
   useEffect(() => {
     if (error) {
       toast.error(error);
     }
   }, [error]);

   // Form submission handling
   const onSubmit = (data) => {
     dispatch(registerForm({ formValue: data, navigate, toast }));
   };


  return (
    <Container className="reg-con-wrap d-flex flex-column min-vh-100">
      <Card className="reg-card-wrap">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <IoPersonCircleSharp className="sign-icon" />
          <h1>Sign up</h1>

          {/* Form fields for user registration */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              name="firstName"
              {...register("firstName")}
              placeholder="Name*"
            />
            <p className="err-valid">{errors.firstName?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Control
              type="text"
              name="lastName"
              {...register("lastName")}
              placeholder="LastName*"
            />
            <p className="err-valid">{errors.lastName?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              name="email"
              {...register("email")}
              placeholder="Email*"
            />
            <p className="err-valid">{errors.email?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Control
              type="password"
              name="password"
              {...register("password")}
              placeholder="Password*"
              autoComplete="off"
            />
            <p className="err-valid">{errors.password?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Control
              type="password"
              name="password"
              {...register("confirmPassword")}
              placeholder="ConfirmPassword*"
              autoComplete="off"
            />
            <p className="err-valid">{errors.confirmPassword?.message}</p>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit">
              {loading && <SpinnerLoad />}
              Register
            </Button>
          </div>
          {/* Link to login page */}
          <FormText>
            <Link to={"/login"}>
              <p className="link-login">Already Have an account? Sign in</p>
            </Link>
          </FormText>
        </Form>
      </Card>
    </Container>
  );
}

export default RegisterTest;
