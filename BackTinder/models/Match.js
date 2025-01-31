const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
    animal: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" }, // ✅ L'animal qui a été liké
    likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // ✅ L'utilisateur qui a liké cet animal
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Match", MatchSchema);
