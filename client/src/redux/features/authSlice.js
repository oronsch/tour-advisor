import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// Async thunk for user login
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login Successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// Async thunk for user registration
export const registerForm = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register Successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })
    .addCase(registerForm.pending, (state) => {
      state.loading = true;
    })
    .addCase(registerForm.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    })
    .addCase(registerForm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    })
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
