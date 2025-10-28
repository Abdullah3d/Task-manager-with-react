import React, { useState } from "react";

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
            if (card.title) onAddCard(columnId, card);
        });
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-gray-900 p-6 rounded-xl w-96 max-h-[80vh] overflow-y-auto">
                <h2 className="text-white font-semibold mb-4">Add Multiple Cards</h2>

                {cards.map((card, idx) => (
                    <div key={idx} className="mb-4 border border-gray-700 p-3 rounded">
                        <input
                            type="text"
                            placeholder="Title"
                            value={card.title}
                            onChange={(e) => handleChange(idx, "title", e.target.value)}
                            className="w-full p-1 mb-1 rounded bg-gray-800 text-white"
                        />
                        <textarea
                            placeholder="Description"
                            value={card.description}
                            onChange={(e) => handleChange(idx, "description", e.target.value)}
                            className="w-full p-1 mb-1 rounded bg-gray-800 text-white"
                        />
                        <input
                            type="file"
                            multiple
                            onChange={(e) => handleChange(idx, "attachments", Array.from(e.target.files))}
                            className="w-full mb-1 text-white"
                        />
                        <input
                            type="text"
                            placeholder="Checklist (comma separated)"
                            onChange={(e) => handleChange(idx, "checklist", e.target.value.split(","))}
                            className="w-full p-1 mb-1 rounded bg-gray-800 text-white"
                        />
                        <input
                            type="text"
                            placeholder="Labels (comma separated)"
                            onChange={(e) => handleChange(idx, "labels", e.target.value.split(","))}
                            className="w-full p-1 rounded bg-gray-800 text-white"
                        />
                    </div>
                ))}

                <div className="flex justify-between mt-4">
                    <button
                        className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
                        onClick={addCardRow}
                    >
                        + Add Another Card
                    </button>
                    <div className="flex gap-2">
                        <button
                            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                            onClick={handleSubmit}
                        >
                            Submit All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
