import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ children }) => {
  // Extracting the user from the Redux store
  const { user } = useSelector((state) => state.auth);

  // If a user is present (authenticated), render the child components
  // Otherwise, redirect to a loading screen that will eventually redirect to the login page
  return user ? children : <LoadingToRedirect />;
};

export default PrivateRoute;
