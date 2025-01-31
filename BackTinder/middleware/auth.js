const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey12345";

module.exports = (req, res, next) => {
	const token = req.header('Authorization');
	console.log("📌 Token reçu dans middleware :", token); // 🔍 Vérifier le token reçu

	if (!token) return res.status(401).json({ message: "Accès refusé, token manquant" });

	try {
		const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
		req.user = {_id: decoded.userId };  // 🔥 Assure que req.user a un _id
		next();
	} catch (err) {
		res.status(401).json({ message: "Token invalide" });
	}
};


