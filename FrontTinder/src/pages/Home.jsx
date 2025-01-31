import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimals } from "../redux/features/animalSlice";
import TinderCard from "react-tinder-card"; // 🔥 Bibliothèque pour le swipe
import { likeAnimal } from "../redux/features/matchSlice"; // 🔥 Action Redux pour liker

const Home = () => {
    const dispatch = useDispatch();
    const { animals, loading, error } = useSelector((state) => state.animals);
    const [lastDirection, setLastDirection] = useState(null);

    useEffect(() => {
        dispatch(fetchAnimals()); // 🔥 Charge les animaux au chargement de la page
    }, [dispatch]);

    const swiped = (direction, animalId) => {
        if (direction === "right") {
            dispatch(likeAnimal(animalId)); // 🔥 Like seulement si swipe à droite
        }
        setLastDirection(direction);
    };

    return (
        <div className="home-container">
            <h2>Tinder pour Animaux 🐶🐱</h2>

            {loading && <p>Chargement...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="tinder-cards">
                {animals.map((animal) => (
                    <TinderCard
                        className="swipe"
                        key={animal._id}
                        onSwipe={(dir) => swiped(dir, animal._id)}
                        preventSwipe={["up", "down"]}
                    >
                        <div
                            className="card"
                            style={{
                                backgroundImage: `url(${animal.photos[0] || "/default-animal.jpg"})`
                            }}
                        >
                            <h3>{animal.name}, {animal.age} ans</h3>
                            <p>{animal.breed || "Race inconnue"} - {animal.gender}</p>
                        </div>
                    </TinderCard>
                ))}
            </div>

            {lastDirection && <p>Tu as swipé {lastDirection} !</p>}
        </div>
    );
};

export default Home;
