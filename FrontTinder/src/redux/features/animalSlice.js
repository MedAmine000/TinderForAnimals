import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5080/api/animals"; // Connexion à l'API Animaux

// 🔹 Thunk pour récupérer tous les animaux
export const fetchAnimals = createAsyncThunk("animals/fetch", async (_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des animaux");
    }
});

// 🔹 Thunk pour ajouter un animal
export const addAnimal = createAsyncThunk("animals/add", async (animalData, thunkAPI) => {
    try {
        const response = await axios.post(API_URL, animalData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de l'ajout de l'animal");
    }
});

// 🔹 Slice Redux pour gérer les animaux
const animalSlice = createSlice({
    name: "animals",
    initialState: {
        animals: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimals.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAnimals.fulfilled, (state, action) => {
                state.loading = false;
                state.animals = action.payload;
            })
            .addCase(fetchAnimals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addAnimal.pending, (state) => {
                state.loading = true;
            })
            .addCase(addAnimal.fulfilled, (state, action) => {
                state.loading = false;
                state.animals.push(action.payload);
            })
            .addCase(addAnimal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default animalSlice.reducer;
