import * as Yup from "yup";

// Validation schema for user registration inputs
export const inputsValidations = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Name required a minimum of 2 char")
    .max(24, "Name required a max of 24 char")
    .required("Name required"),
  lastName: Yup.string()
    .min(2, "Last name required a minimum of 2 char")
    .max(24, "Last name required a max of 24 char")
    .required("Last name required"),
  email: Yup.string()
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Please enter a valid email!")
    .required("Email required")
    .email(),

  password: Yup.string()
    .min(6, "Password required a minimum of 2 char")
    .max(24, "Password required a max of 2 char")
    .required("Password required"),
  confirmPassword: Yup.string()
    .label("confirm password")
    .required("confirm password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

// This schema ensures that:
// - First name and last name are between 2 and 24 characters
// - Email is valid and required
// - Password is between 6 and 24 characters
// - Confirm password matches the password field
