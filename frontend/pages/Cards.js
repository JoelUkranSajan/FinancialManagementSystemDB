import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Cards = () => {
    const router = useRouter();
    const { mobileNumber } = router.query;
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (mobileNumber) {
            fetch(`/api/cards/fetch?mobileNumber=${mobileNumber}`)
                .then((res) => res.json())
                .then((data) => setCards(data.cards || []))
                .catch(() => setMessage("Failed to fetch cards."))
                .finally(() => setLoading(false));
        }
    }, [mobileNumber]);

    const handleDeleteCard = async (cardNumber) => {
        if (confirm("Are you sure you want to delete this card?")) {
            try {
                const response = await fetch(`/api/cards/delete?mobileNumber=${mobileNumber}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    setCards((prev) => prev.filter((card) => card.cardNumber !== cardNumber));
                } else {
                    setMessage("Failed to delete card.");
                }
            } catch (error) {
                console.error("Failed to delete card:", error);
                setMessage("An error occurred while deleting the card.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4">Your Cards</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                cards.map((card) => (
                    <div key={card.cardNumber} className="bg-gray-800 p-4 rounded mb-4">
                        <p>Card Number: {card.cardNumber}</p>
                        <p>Type: {card.cardType}</p>
                        <p>Total Limit: {card.totalLimit}</p>
                        <p>Amount Used: {card.amountUsed}</p>
                        <p>Available: {card.availableAmount}</p>
                        <button onClick={() => handleDeleteCard(card.cardNumber)}>Delete Card</button>
                    </div>
                ))
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Cards;
