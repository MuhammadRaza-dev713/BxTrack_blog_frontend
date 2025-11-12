"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/api";

export const fetchPosts = createAsyncThunk("posts/fetchAll", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const fetchPostById = createAsyncThunk("posts/fetchById", async (id, thunkAPI) => {
  try {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const createPost = createAsyncThunk("posts/create", async (payload, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    const { data } = await axios.post("/posts", payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const updatePost = createAsyncThunk("posts/update", async ({ id, payload }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    const { data } = await axios.put(`/posts/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

export const deletePost = createAsyncThunk("posts/delete", async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    await axios.delete(`/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || { message: err.message });
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState: { list: [], current: null, loading: false, error: null },
  reducers: {
    clearCurrent(state) { state.current = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchPosts.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
      .addCase(fetchPosts.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message; })

      .addCase(fetchPostById.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchPostById.fulfilled, (s, a) => { s.loading = false; s.current = a.payload; })
      .addCase(fetchPostById.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message; })

      .addCase(createPost.fulfilled, (s, a) => { s.list.unshift(a.payload); })
      .addCase(updatePost.fulfilled, (s, a) => {
        s.list = s.list.map((p) => (p._id === a.payload._id ? a.payload : p));
        if (s.current && s.current._id === a.payload._id) s.current = a.payload;
      })
      .addCase(deletePost.fulfilled, (s, a) => {
        s.list = s.list.filter((p) => p._id !== a.payload);
        if (s.current && s.current._id === a.payload) s.current = null;
      });
  }
});

export const { clearCurrent } = postSlice.actions;
export default postSlice.reducer;
