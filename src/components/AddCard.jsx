import React, { useState } from "react";
import { Plus, X } from "react-feather";

export default function AddCard({ onAdd }) {
    const [card, setCard] = useState("");
    const [show, setShow] = useState(false);

    const handleAddCard = () => {
        if (!card.trim()) return;
        if (onAdd) onAdd(card); // ✅ send string only
        setCard("");
        setShow(false);
    };

    return (
        <div className="flex flex-col mt-2 w-full">
            {show ? (
                <div className="animate-fade-in w-full">
                    <textarea
                        value={card}
                        onChange={(e) => setCard(e.target.value)}
                        className="p-2 w-full rounded-md border border-[#3A3F45] bg-[#22272B] text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-sky-500 text-sm sm:text-base"
                        rows={3}
                        placeholder="Enter a title for this card..."
                    />
                    <div className="flex flex-col sm:flex-row mt-2 gap-2 w-full">
                        <button
                            onClick={handleAddCard}
                            className="px-3 py-2 rounded bg-blue-600 text-white text-sm sm:text-base hover:bg-blue-700 transition w-full sm:w-auto"
                        >
                            Add Card
                        </button>
                        <button
                            onClick={() => setShow(false)}
                            className="p-2 rounded hover:bg-[#3A3F45] transition w-full sm:w-auto flex justify-center items-center"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShow(true)}
                    className="flex items-center gap-2 px-2 py-2 w-full text-sm sm:text-base text-[#B6C2CF] hover:bg-[#3A3F45] rounded-md transition justify-center sm:justify-start"
                >
                    <Plus size={16} /> Add a card
                </button>
            )}
        </div>
    );
}
