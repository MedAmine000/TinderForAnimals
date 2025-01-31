import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAnimal } from "../redux/features/animalSlice";
import { useNavigate } from "react-router-dom";

const AddAnimal = () => {
    const [animalData, setAnimalData] = useState({ name: "", age: "", species: "", gender: "Mâle", photos: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setAnimalData({ ...animalData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addAnimal(animalData));
        navigate("/home"); // 🔥 Redirige vers Home après l'ajout
    };

    return (
        <div>
            <h2>Ajouter un Animal 🐾</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nom" onChange={handleChange} required />
                <input type="number" name="age" placeholder="Âge" onChange={handleChange} required />
                <input type="text" name="species" placeholder="Espèce (Chien, Chat...)" onChange={handleChange} required />
                <select name="gender" onChange={handleChange}>
                    <option value="Mâle">Mâle</option>
                    <option value="Femelle">Femelle</option>
                </select>
                <input type="text" name="photos" placeholder="Lien de l'image" onChange={handleChange} />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddAnimal;
