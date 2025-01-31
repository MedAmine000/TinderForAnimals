import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../redux/features/messageSlice";
import { useParams } from "react-router-dom";

const Chat = () => {
    const { userId } = useParams(); // ✅ On récupère l'ID de l'utilisateur avec qui on parle
    const dispatch = useDispatch();
    const { messages, loading } = useSelector((state) => state.messages);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        console.log("📩 Ouverture du chat avec :", userId); // 🔍 Debug
        if (userId) dispatch(fetchMessages(userId)); // ✅ Charge les messages
    }, [dispatch, userId]);

    const handleSendMessage = () => {
        console.log("📩 Envoi d'un message à :", userId, "Contenu :", newMessage); // 🔍 Debug

        if (!userId || !newMessage.trim()) {
            console.error("❌ Impossible d'envoyer le message !");
            return;
        }

        dispatch(sendMessage({ receiverId: userId, content: newMessage }));
        setNewMessage("");
    };

    return (
        <div>
            <h2>Chat</h2>
            {loading && <p>Chargement...</p>}

            <div>
                {messages.map((msg, index) => (
                    <p key={index} className={msg.senderId === userId ? "received" : "sent"}>
                        <strong>{msg.senderId === userId ? "Eux" : "Toi"}:</strong> {msg.content}
                    </p>
                ))}
            </div>

            <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Écris un message..."
            />
            <button onClick={handleSendMessage}>Envoyer</button>
        </div>
    );
};

export default Chat;
