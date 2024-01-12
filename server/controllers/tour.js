import TourModal from "../models/tour.js";
import mongoose from "mongoose";

// Error Messages
const ERR_MSG = "Something went wrong";
const NO_TOUR = "No tour exists with this ID";

// Get tours limited to 6 by page
export const getTours = async (req, res) => {
  const { page } = req.query;

  try {
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;

    // Count total tours
    const total = await TourModal.countDocuments({});

    // Find tours with pagination
    const tours = await TourModal.find().limit(limit).skip(startIndex);

    res.json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: ERR_MSG });
  }
};

// Find tours by search title
export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    // Find tours with matching title
    const tours = await TourModal.find({ title });

    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: ERR_MSG });
  }
};

// Get tour by ID
export const getTour = async (req, res) => {
  const { id } = req.params;

  try {
    // Find tour by ID
    const tour = await TourModal.findById(id);

    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: ERR_MSG });
  }
};

// Create a new tour
export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModal({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    // Save the new tour
    await newTour.save();

    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: NO_TOUR });
  }
};

// Get tours by user ID
export const getToursByUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  // Find tours created by the user
  const userTours = await TourModal.find({ creator: id });

  res.status(200).json(userTours);
};

// Delete tour by ID
export const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `${NO_TOUR}: ${id}` });
    }

    // Remove the tour by ID
    await TourModal.findByIdAndRemove(id);

    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: ERR_MSG });
  }
};

// Update tour by ID
export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `${NO_TOUR}: ${id}` });
    }

    // Create the updated tour object
    const updatedTour = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
      tags,
    };

    // Update the tour by ID
    await TourModal.findByIdAndUpdate(id, updatedTour, { new: true });

    res.json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: ERR_MSG });
  }
};

// Find tours by tag
export const getToursByTag = async (req, res) => {
  const { tag } = req.params;

  try {
    // Find tours with the specified tag
    const tours = await TourModal.find({ tags: { $in: tag } });

    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: ERR_MSG });
  }
};

// Find related tours by tags
export const getRelatedTours = async (req, res) => {
  const tags = req.body;

  try {
    // Find tours with tags that match any of the provided tags
    const tours = await TourModal.find({ tags: { $in: tags } });

    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: ERR_MSG });
  }
};

// Like tour posts by authorized userId
export const likeTour = async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.userId) {
      return res.json({ message: "User not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exists with id: ${id}` });
    }

    // Find the tour by ID
    const tour = await TourModal.findById(id);

    // Check if the user has already liked the tour
    const index = tour.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // User hasn't liked the tour, add their ID to the likes array
      tour.likes.push(req.userId);
    } else {
      // User has already liked the tour, remove their ID from the likes array
      tour.likes = tour.likes.filter((id) => id !== String(req.userId));
    }

    // Update the tour with the modified likes array
    const updatedTour = await TourModal.findByIdAndUpdate(id, tour, {
      new: true,
    });

    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
