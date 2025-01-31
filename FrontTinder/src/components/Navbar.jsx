import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token"); // 🔥 Assure-toi que le token est bien supprimé
        navigate("/login", { replace: true }); // 🔥 Redirige correctement vers "/login"
    };


    return (
        <nav className="navbar">
            <Link to="/home">🐶 Home</Link>
            <Link to="/matches">❤️ Matchs</Link>
            <Link to="/add-animal">➕ Ajouter un animal</Link> {/* ✅ Ajout du bouton */}
            <button onClick={handleLogout}>🚪 Déconnexion</button>
        </nav>
    );
};

export default Navbar;
