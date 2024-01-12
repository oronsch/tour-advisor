import express from "express";
import auth from "../middleware/auth.js";
import {
  createTour,
  deleteTour,
  getTour,
  getTours,
  getToursBySearch,
  getToursByUser,
  updateTour,
  getToursByTag,
  getRelatedTours,
  likeTour,
} from "../controllers/tour.js";

const router = express.Router();

// Define API routes without authentication
router.get("/search", getToursBySearch); 
router.get("/search", getTours);
router.get("/", getTours);
router.get("/:id", getTour);
router.get("/tag/:tag", getToursByTag);
router.post("/relatedTours", getRelatedTours);

// Define API routes that require authentication
router.get("/userTours/:id", auth, getToursByUser);
router.patch("/:id", auth, updateTour);
router.patch("/like/:id", auth, likeTour);
router.post("/", auth, createTour);
router.delete("/:id", auth, deleteTour);

export default router;
