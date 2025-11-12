"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const userLocal = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;

export const registerUser = createAsyncThunk("auth/register", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post("/auth/register", payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const loginUser = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post("/auth/login", payload);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    user: userLocal || null,
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.user = a.payload.user;
        localStorage.setItem("token", a.payload.token);
        localStorage.setItem("user", JSON.stringify(a.payload.user));
      })
      .addCase(registerUser.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message || "Register failed"; })

      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.user = a.payload.user;
        localStorage.setItem("token", a.payload.token);
        localStorage.setItem("user", JSON.stringify(a.payload.user));
      })
      .addCase(loginUser.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message || "Login failed"; });
  }
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
