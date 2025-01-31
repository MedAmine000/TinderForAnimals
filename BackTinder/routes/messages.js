const express = require("express");
const Message = require("../models/Message");
const Match = require("../models/Match");
const auth = require("../middleware/auth");
const router = express.Router();

// 🔹 Vérifier si deux animaux ont matché avant d'autoriser le chat
const checkMatch = async (senderId, receiverId) => {
  return await Match.findOne({
    $or: [
      { animal1: senderId, animal2: receiverId },
      { animal1: receiverId, animal2: senderId }
    ]
  });
};

// 🔹 Envoyer un message
router.post("/", auth, async (req, res) => {
  try {
      console.log("📩 Requête reçue :", req.body); // 🔍 Debug
      console.log("👤 Utilisateur connecté :", req.user); // 🔍 Debug

      const senderId = req.user._id;
      const { receiverId, content } = req.body;

      if (!receiverId || !content) {
          return res.status(400).json({ error: "receiverId et content sont requis" });
      }

      if (!senderId) {
          return res.status(400).json({ message: "senderId is not defined" });
      }

      const message = new Message({ senderId, receiverId, content });
      await message.save();

      res.json(message);
  } catch (err) {
      console.error("❌ Erreur serveur lors de l'envoi du message :", err);
      res.status(500).json({ error: err.message });
  }
});


module.exports = router;
