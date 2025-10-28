import React, { useState } from "react";
import { Plus, X } from "react-feather";

export default function AddCard({ onAdd }) {
    const [card, setCard] = useState("");
    const [show, setShow] = useState(false);

    const handleAddCard = () => {
        if (card.trim() === "") return;
        if (onAdd) onAdd(card); // send card to Main
        setCard("");
        setShow(false);
    };

    return (
        <div className="flex flex-col mt-2">
            {show ? (
                <div className="animate-fade-in">
                    <textarea
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                        className="p-2 w-full rounded-md border border-gray-700 bg-zinc-800 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-sky-500"
                        rows={3}
                        placeholder="Enter card title..."
                    ></textarea>
                    <div className="flex mt-2">
                        <button
                            onClick={handleAddCard}
                            className="px-3 py-1.5 rounded bg-sky-600 text-white mr-2 hover:bg-sky-700 transition"
                        >
                            Add Card
                        </button>
                        <button
                            onClick={() => setShow(false)}
                            className="p-1 rounded hover:bg-gray-700 transition"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShow(true)}
                    className="flex items-center gap-2 px-2 py-1.5 w-full text-sm text-gray-300 hover:bg-gray-700 rounded-md transition"
                >
                    <Plus size={16} /> Add a card
                </button>
            )}
        </div>
    );
}
