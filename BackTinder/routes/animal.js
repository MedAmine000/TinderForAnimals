const express = require("express");
const router = express.Router();
const Animal = require("../models/Animal");
const auth = require("../middleware/auth");

// 🔹 Ajouter un nouvel animal
router.post("/", auth, async (req, res) => {
  try {
    const { name, age, species, breed, gender, description, photos } = req.body;
    const newAnimal = new Animal({ 
      name, age, species, breed, gender, description, photos, 
      owner: req.user._id 
    });

    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Récupérer tous les animaux
router.get("/", auth, async (req, res) => {
  try {
    const animals = await Animal.find().populate("owner", "username email");
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔹 Supprimer un animal
router.delete("/:id", auth, async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal non trouvé" });

    if (animal.owner.toString() !== req.user._id) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    await animal.deleteOne();
    res.json({ message: "Animal supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
