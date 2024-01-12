import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Asynchronous actions using createAsyncThunk
// Each action corresponds to an API call and handles pending, fulfilled, and rejected states.

// Create a new tour
export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      toast.success("Tour Added Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return (
        rejectWithValue(err.response.data) 
      );
    }
  }
);

// Get a list of tours
export const getTours = createAsyncThunk(
  "tour/getTours",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getTours(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Search for tours based on a query
export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get a single tour by its ID
export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get tours by the user
export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// delete tour by id
export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      toast.success("Tour Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update tour by id
export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id);
      toast.success("Tour Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get tours by tag
export const getToursByTag = createAsyncThunk(
  "tour/getToursByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagTours(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// get related tours by tag
export const getRelatedTours = createAsyncThunk(
  "tour/getRelatedTours",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedTours(tags);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// like tour by id
export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeTour(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Redux slice for managing tour-related state
const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    tagTours: [],
    relatedTours: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    // Reducer to set the current page for pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handling lifecycle of each async action
    // For each action, handling pending, fulfilled, and rejected states
    builder
      .addCase(createTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = [action.payload];
      })
      .addCase(createTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // get related tours by tag lifecycle
      .addCase(getRelatedTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRelatedTours.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedTours = action.payload;
      })
      .addCase(getRelatedTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // get tours lifecycle
      .addCase(getTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload.data;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // get tour lifecycle
      .addCase(getTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tour = action.payload;
      })
      .addCase(getTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // get tours by user lifecycle
      .addCase(getToursByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getToursByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userTours = action.payload;
      })
      .addCase(getToursByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // tag tours lifecycle
      .addCase(getToursByTag.pending, (state) => {
        state.loading = true;
      })
      .addCase(getToursByTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tagTours = action.payload;
      })
      .addCase(getToursByTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // delete tour lifecycle
      .addCase(deleteTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTour.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userTours = state.userTours.filter((item) => item._id !== id);
          state.tours = state.tours.filter((item) => item._id !== id);
        }
      })
      .addCase(deleteTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // update tour lifecycle
      .addCase(updateTour.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTour.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.userTours = state.userTours.map((item) =>
            item._id === id ? action.payload : item
          );
          state.tours = state.tours.map((item) =>
            item._id === id ? action.payload : item
          );
        }
      })

      .addCase(updateTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // like tour lifecycle
      .addCase(likeTour.pending, (state) => {
        state.loading = true;
      })

      .addCase(likeTour.fulfilled, (state, action) => {
        state.loading = false;
        const {
          arg: { _id },
        } = action.meta;
        if (_id) {
          state.tours = state.tours.map((item) =>
            item._id === _id ? action.payload : item
          );
        }
      })

      .addCase(likeTour.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      // search tours lifecycle
      .addCase(searchTours.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
      })
      .addCase(searchTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setCurrentPage } = tourSlice.actions;
export default tourSlice.reducer;
