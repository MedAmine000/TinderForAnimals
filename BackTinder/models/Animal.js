const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  species: { type: String, required: true }, // Exemple: "Chien", "Chat"
  breed: { type: String },
  gender: { type: String, enum: ["Mâle", "Femelle"], required: true },
  description: { type: String },
  photos: [{ type: String }], // Stocker les URL des images
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Propriétaire de l'animal
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animal" }], // Animaux likés
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Animal", AnimalSchema);
