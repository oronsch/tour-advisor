import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";

// Configuring the Redux store
export default configureStore({
  reducer: {
    // Assigning slices to the store
    auth: AuthReducer, // Handles authentication-related state
    tour: TourReducer, // Handles tour-related state
  },
});
