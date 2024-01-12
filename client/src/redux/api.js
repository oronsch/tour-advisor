import axios from "axios";

// Base configuration for Axios with a set base URL
const API = axios.create({ baseURL: "http://localhost:3900" });

// Axios interceptor to include the JWT token in each request's Authorization header
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// API endpoints

// Fetch tours based on search query
export const getToursBySearch = (searchQuery) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);
// Fetch tours created by a specific user  
export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);
// Fetch a list of tours with pagination
export const getTours = (page) => API.get(`/tour?page=${page}`);
// Fetch a single tour by its ID
export const getTour = (id) => API.get(`/tour/${id}`);
// Fetch tours tagged with a specific tag
export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);

// User authentication endpoints
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);

// Create a new tour
export const createTour = (tourData) => API.post("/tour", tourData);
// Fetch related tours based on tags
export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);
// Delete a tour by its ID
export const deleteTour = (id) => API.delete(`/tour/${id}`);
// Like a tour
export const likeTour = (id) => API.patch(`/tour/like/${id}`);
// Update a tour
export const updateTour = (updatedTourData, id) =>
  API.patch(`/tour/${id}`, updatedTourData);
