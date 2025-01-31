import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5080/api/messages";

// 🔹 Récupérer les messages (seulement après un match)
export const fetchMessages = createAsyncThunk("messages/fetch", async (receiverId, thunkAPI) => {
  try {
    console.log("📩 Récupération des messages pour receiverId :", receiverId); // 🔍 Debug

    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Utilisateur non authentifié");

    const response = await axios.get(`${API_URL}/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors du chargement des messages");
  }
});

// 🔹 Envoyer un message (uniquement après un match)
export const sendMessage = createAsyncThunk("messages/send", async ({ receiverId, content }, thunkAPI) => {
  try {
      const token = localStorage.getItem("token");

      console.log("📩 Envoi du message :", { receiverId, content, token }); // 🔍 Debug

      if (!token) {
          return thunkAPI.rejectWithValue("Utilisateur non authentifié");
      }

      const response = await axios.post("http://localhost:5080/api/messages", { receiverId, content }, {
          headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Erreur lors de l'envoi du message");
  }
});


// 🔹 Slice Redux pour gérer les messages
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = Array.isArray(action.payload) ? action.payload : [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
