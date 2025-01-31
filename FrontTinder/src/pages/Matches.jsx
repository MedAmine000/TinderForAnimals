import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches } from "../redux/features/matchSlice";
import { useNavigate } from "react-router-dom";

const Matches = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { matches, loading, error } = useSelector((state) => state.match);

    useEffect(() => {
        dispatch(fetchMatches()); // 🔥 Charge les matchs dès l'affichage
    }, [dispatch]);

    const startChat = (userId) => {
        console.log("📩 Démarrage du chat avec :", userId); // 🔍 Debug
        navigate(`/chat/${userId}`); // ✅ Redirige vers la page de chat
    };

    return (
        <div>
            <h2>🎉 Tes Animaux et leurs Likers</h2>
            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {matches.length === 0 ? <p>Aucun match trouvé.</p> : (
                <ul>
                    {matches.map((match) => (
                        <li key={match._id}>
                            <strong>{match.animal.name} a été liké par :</strong> {match.likedBy.username}
                            <button onClick={() => startChat(match.likedBy._id)}>
                                📩 Envoyer un message
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Matches;
