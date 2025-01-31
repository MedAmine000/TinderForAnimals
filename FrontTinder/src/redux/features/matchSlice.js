import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5080/api/match"; // 🔥 Connexion à l'API Matchs

// 🔹 Liker un animal
export const likeAnimal = createAsyncThunk("match/like", async (animalId, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/like/${animalId}`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du like");
    }
});

// 🔹 Récupérer les matchs
export const fetchMatches = createAsyncThunk("match/fetch", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:5080/api/match", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des matchs");
    }
});

// 🔹 Slice Redux pour gérer les matchs
const matchSlice = createSlice({
    name: "match",
    initialState: {
        matches: [],
        likedAnimals: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(likeAnimal.pending, (state) => {
                state.loading = true;
            })
            .addCase(likeAnimal.fulfilled, (state, action) => {
                state.loading = false;
                state.likedAnimals.push(action.payload);
            })
            .addCase(likeAnimal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMatches.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMatches.fulfilled, (state, action) => {
                state.loading = false;
                state.matches = action.payload;
            })
            .addCase(fetchMatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default matchSlice.reducer;