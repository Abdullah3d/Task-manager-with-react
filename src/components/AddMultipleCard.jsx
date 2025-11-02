import React, { useState } from "react";
import { X, Plus } from "react-feather";

export default function AddMultipleCardsModal({ open, columnId, onClose, onAddCard }) {
    const [cards, setCards] = useState([
        { title: "", description: "", attachments: [], checklist: [], labels: [] }
    ]);

    const addCardRow = () => {
        setCards([...cards, { title: "", description: "", attachments: [], checklist: [], labels: [] }]);
    };

    const handleChange = (index, field, value) => {
        const newCards = [...cards];
        newCards[index][field] = value;
        setCards(newCards);
    };

    const handleSubmit = () => {
        cards.forEach(card => {
            if (card.title?.trim()) onAddCard(columnId, card); // send object
        });
        onClose();
        setCards([{ title: "", description: "", attachments: [], checklist: [], labels: [] }]); // reset modal
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in px-4">
            <div className="bg-[#1f1f1f]/90 border border-[#3a3a3a] rounded-2xl shadow-xl w-full sm:w-[420px] max-h-[85vh] overflow-y-auto text-white p-4 sm:p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                    <h2 className="text-lg font-semibold tracking-wide">Add Multiple Cards</h2>
                    <button onClick={onClose} className="p-1 rounded hover:bg-gray-700 transition">
                        <X size={18} />
                    </button>
                </div>

                {/* Cards Inputs */}
                {cards.map((card, idx) => (
                    <div key={idx} className="mb-5 p-3 bg-[#2a2a2a] rounded-lg shadow-inner border border-[#444]">
                        <h3 className="text-sm text-gray-300 mb-2 font-semibold">Card {idx + 1}</h3>
                        <input
                            type="text"
                            placeholder="Card title..."
                            value={card.title}
                            onChange={(e) => handleChange(idx, "title", e.target.value)}
                            className="w-full mb-2 p-2 rounded bg-[#0e0e0e]/70 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm sm:text-base"
                        />
                        <textarea
                            placeholder="Description..."
                            value={card.description}
                            onChange={(e) => handleChange(idx, "description", e.target.value)}
                            className="w-full mb-2 p-2 rounded bg-[#0e0e0e]/70 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none text-sm sm:text-base"
                            rows={2}
                        />
                        <input
                            type="text"
                            placeholder="Checklist (comma separated)"
                            value={card.checklist.join(",")}
                            onChange={(e) => handleChange(idx, "checklist", e.target.value.split(","))}
                            className="w-full mb-2 p-2 rounded bg-[#0e0e0e]/70 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm sm:text-base"
                        />
                        <input
                            type="text"
                            placeholder="Labels (comma separated)"
                            value={card.labels.join(",")}
                            onChange={(e) => handleChange(idx, "labels", e.target.value.split(","))}
                            className="w-full p-2 rounded bg-[#0e0e0e]/70 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm sm:text-base"
                        />
                    </div>
                ))}

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2 border-t border-gray-700 pt-3">
                    <button
                        className="flex items-center justify-center gap-2 bg-[#2a7b9b] hover:bg-[#3b9bb8] text-white px-3 py-2 rounded transition w-full sm:w-auto"
                        onClick={addCardRow}
                    >
                        <Plus size={16} /> Add Another
                    </button>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button
                            onClick={onClose}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded transition w-full sm:w-auto"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition w-full sm:w-auto"
                        >
                            Submit All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
