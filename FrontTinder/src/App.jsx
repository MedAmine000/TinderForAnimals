import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddAnimal from "./pages/AddAnimal"; // ✅ Import

import Navbar from "./components/Navbar"; 
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
      {token && <Navbar />} {/* ✅ Affiche la barre seulement si connecté */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Route pour Login */}
        <Route path="/chat/:userId" element={<Chat />} /> {/* ✅ Vérifie que la route est bien là */}

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chat/:animalId" element={<Chat />} />
          <Route path="/add-animal" element={<AddAnimal />} /> {/* ✅ Nouvelle route */}

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
