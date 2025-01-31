const express = require("express");
const router = express.Router();
const Match = require("../models/Match");
const Animal = require("../models/Animal");
const auth = require("../middleware/auth");

// 🔹 Liker un animal
// 🔹 Liker un animal
router.post("/like/:animalId", auth, async (req, res) => {
    try {
        const { animalId } = req.params;
        const userId = req.user._id; // ✅ Utilisateur qui like

        const animal = await Animal.findById(animalId);
        if (!animal) return res.status(404).json({ message: "Animal non trouvé" });

        // Vérifier si cet utilisateur a déjà liké cet animal
        const existingMatch = await Match.findOne({ animal: animalId, likedBy: userId });
        if (existingMatch) return res.status(400).json({ message: "Déjà liké" });

        // Enregistrer le match
        const newMatch = new Match({ animal: animalId, likedBy: userId });
        await newMatch.save();

        res.json({ message: "Like enregistré", match: newMatch });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// 🔹 Récupérer les matchs d’un utilisateur
router.get("/", auth, async (req, res) => {
    try {
        // Trouver tous les animaux appartenant à l'utilisateur connecté
        const userAnimals = await Animal.find({ owner: req.user._id });

        // Extraire les IDs de ces animaux
        const userAnimalIds = userAnimals.map(animal => animal._id);

        // Trouver les matchs où ces animaux ont été likés
        const matches = await Match.find({ animal: { $in: userAnimalIds } })
            .populate("animal")
            .populate("likedBy", "username email");

        res.json(matches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
