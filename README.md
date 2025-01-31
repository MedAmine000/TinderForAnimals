# 🐶 Tinder pour Animaux

## 📌 Description
**Tinder pour Animaux** est une application web permettant aux utilisateurs de créer des profils pour leurs animaux et de leur trouver des compagnons grâce à un système de swipe et match. Une fois un match établi, un système de messagerie permet aux propriétaires de discuter.

---

## 🚀 Fonctionnalités
- ✅ **Inscription et Connexion** (avec JWT)
- ✅ **Ajout d’animaux** (nom, âge, espèce, photo)
- ✅ **Système de Swipe & Match**
- ✅ **Messagerie en temps réel** (avec WebSocket)
- ✅ **Stockage des images** (local ou cloud)

---

## 📂 Structure du projet

### 📌 Backend (Node.js, Express, MongoDB)
📦 backend ├── 📄 server.js # Configuration du serveur
├── 📂 models # Modèles MongoDB (User, Animal, Match, Message)
├── 📂 routes # Routes API (auth, animals, match, messages)
├── 📂 middleware # Middleware d’authentification JWT
├── 📂 config # Configuration de la base de données et des variables d’environnement



---

### 📌 Frontend (React, Redux, Tailwind)
📦 frontend ├── 📂 pages # Home, Login, Register, Matches, Chat
├── 📂 redux # Gestion des états (auth, animaux, match, messages)
├── 📂 components # Cartes des animaux, Chatbox
├── 📄 App.js # Composant principal
├── 📄 index.js # Point d’entrée de l’application




---

## 🛠️ Installation & Lancement

### 1️⃣ Backend

cd backend
npm install
node server.js




### 2️⃣ Frontend

cd frontend
npm install
npm run dev

### 📌 Technologies

Backend : Node.js, Express, MongoDB, Socket.io
Frontend : React, Redux Toolkit
Auth : JWT (JSON Web Tokens)

--
### 💡 Améliorations possibles
✅ Système de notifications 🔔
✅ Stockage Cloud des images (Cloudinary/Firebase) ☁️
✅ Améliorer l’UI (Animations, design) 🎨
✅ IA de suggestion d'animaux 
✅ 


👨‍💻 Développé par [Korniti MedAmine]
📅 Dernière mise à jour : 2025 🚀
