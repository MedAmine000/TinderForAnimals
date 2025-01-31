import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Remplace par l'URL de ton backend
const API_URL = 'http://localhost:5080/api/auth';

// Thunk pour l'inscription
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    localStorage.setItem("token", response.data.token); // Stocke le token dans localStorage

    console.log("Token reçu:", response.data.token); // Debugging

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de la connexion");
  }
});

// Thunk pour la connexion
export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Slice d'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null, // ✅ Récupération depuis `localStorage`
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...action.payload.user, _id: action.payload.user.id }; // 🔥 Fix: Assure _id
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // ✅ Stocker le token

        localStorage.setItem('user', JSON.stringify(state.user)); // ✅ Stocke avec `_id`
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...action.payload.user, _id: action.payload.user.id }; // 🔥 Fix: Transforme `id` en `_id`
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // ✅ Stocker le token

        localStorage.setItem('user', JSON.stringify(state.user)); // ✅ Stocke avec `_id`
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
