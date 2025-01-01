import { useRouter } from "next/router";
import React, { useState } from "react";

const AddCard = () => {
    const router = useRouter();
    const { mobileNumber } = router.query;
    const [message, setMessage] = useState("");

    const handleAddCard = async () => {
        setMessage("");
        try {
            const response = await fetch(`/api/cards/create?mobileNumber=${mobileNumber}`, {
                method: "POST",
            });

            if (response.ok) {
                setMessage("Card created successfully!");
                router.push(`/account/cards?mobileNumber=${mobileNumber}`);
            } else {
                const data = await response.json();
                setMessage(data.error || "Failed to create card.");
            }
        } catch (error) {
            console.error("Card creation failed:", error);
            setMessage("An error occurred while creating the card.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4">Add New Card</h1>
            <button
                onClick={handleAddCard}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
            >
                Add Card
            </button>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default AddCard;
