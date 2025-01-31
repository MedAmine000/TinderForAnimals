import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import messageReducer from "./features/messageSlice";
import animalReducer from "./features/animalSlice";
import matchReducer from "./features/matchSlice"; // 🔥 Nouveau reducer

const store = configureStore({
    reducer: {
        auth: authReducer,
        messages: messageReducer,
        animals: animalReducer,
        match: matchReducer, // ✅ Ajout du reducer des matchs
    },
});

export default store;
