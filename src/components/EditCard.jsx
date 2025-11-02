import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditCard() {
    const navigate = useNavigate();
    const { state } = useLocation();
    if (!state) return <div>Card not found</div>;

    const { cardId, columnId, columns, setColumns } = state;

    const column = columns.find((col) => col.id === columnId);
    if (!column) return <div>Column not found</div>;

    const card = column.cards.find((c) => c.id === cardId);
    if (!card) return <div>Card not found</div>;

    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const [checklist, setChecklist] = useState(card.checklist || []);

    const handleSave = () => {
        const updatedColumns = columns.map((col) =>
            col.id === columnId
                ? {
                    ...col,
                    cards: col.cards.map((c) =>
                        c.id === cardId ? { ...c, title, description, checklist } : c
                    ),
                }
                : col
        );
        setColumns(updatedColumns);
        navigate(-1);
    };

    const addChecklistItem = () => {
        const text = prompt("Enter checklist item:");
        if (text) setChecklist([...checklist, { text, completed: false }]);
    };

    const toggleChecklistItem = (index) => {
        const newChecklist = [...checklist];
        newChecklist[index].completed = !newChecklist[index].completed;
        setChecklist(newChecklist);
    };

    const removeChecklistItem = (index) => {
        const newChecklist = checklist.filter((_, i) => i !== index);
        setChecklist(newChecklist);
    };

    return (
        <div className="p-4 min-h-screen bg-[#1D2125] text-white">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-3 py-1 rounded bg-[#3A3F45] hover:bg-[#4A4F55]"
            >
                Back
            </button>

            <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                    className="w-full p-2 rounded bg-[#22272B] border border-[#3A3F45]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                    className="w-full p-2 rounded bg-[#22272B] border border-[#3A3F45]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                />
            </div>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Checklist</h2>
                <ul className="mb-2">
                    {checklist.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 mb-1">
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => toggleChecklistItem(idx)}
                            />
                            <span>{item.text}</span>
                            <button
                                onClick={() => removeChecklistItem(idx)}
                                className="ml-auto text-red-400 hover:text-red-600"
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={addChecklistItem}
                    className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-700"
                >
                    + Add Item
                </button>
            </div>

            <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-green-600 hover:bg-green-700"
            >
                Save Changes
            </button>
        </div>
    );
}
