const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // Import pour créer un serveur HTTP
const { Server } = require('socket.io'); // Importation de socket.io

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

// Importer les routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages'); 
const animalRoutes = require("./routes/animal");
const matchRoutes = require("./routes/match");
const auth = require("./middleware/auth"); // ✅ Import du middleware

// Définir les routes API (Sans forum)
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/messages", auth, require("./routes/messages")); // ✅ Vérifie que les routes sont protégées

// Création du serveur HTTP
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // À restreindre en production pour éviter les failles CORS
  }
});

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('🔌 Un utilisateur est connecté :', socket.id);

  socket.on('joinRoom', ({ senderId, receiverId }) => {
    const room = [senderId, receiverId].sort().join('_'); 
    socket.join(room);
    console.log(`📢 Utilisateur ${senderId} rejoint la room ${room}`);
  });

  socket.on('sendMessage', async (data) => {
    const { senderId, receiverId, content } = data;
    const room = [senderId, receiverId].sort().join('_');

    io.to(room).emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('❌ Utilisateur déconnecté :', socket.id);
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 5080;
server.listen(PORT, () => console.log(`🚀 Serveur WebSocket démarré sur le port ${PORT}`));
