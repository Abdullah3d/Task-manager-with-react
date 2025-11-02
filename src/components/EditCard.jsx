import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCard({ columns, setColumns }) {
    const navigate = useNavigate();
    const { id } = useParams();

    // Find column and card
    const column = columns.find(col => col.cards.some(c => c.id === id));
    const card = column?.cards.find(c => c.id === id);

    const [title, setTitle] = useState(card?.title || "");
    const [description, setDescription] = useState(card?.description || "");
    const [checklist, setChecklist] = useState(card?.checklist || []);
    const [labels, setLabels] = useState(card?.labels || []);

    if (!card)
        return (
            <p className="p-4 text-white text-center text-lg">Card not found</p>
        );

    // Checklist functions
    const addChecklistItem = () => setChecklist([...checklist, { text: "", completed: false }]);
    const handleChecklistChange = (index, value) => {
        const newChecklist = [...checklist];
        newChecklist[index].text = value;
        setChecklist(newChecklist);
    };
    const toggleChecklist = (index) => {
        const newChecklist = [...checklist];
        newChecklist[index].completed = !newChecklist[index].completed;
        setChecklist(newChecklist);
    };
    const removeChecklistItem = (index) => setChecklist(checklist.filter((_, i) => i !== index));

    // Label functions
    const addLabel = () => setLabels([...labels, ""]);
    const handleLabelChange = (index, value) => {
        const newLabels = [...labels];
        newLabels[index] = value;
        setLabels(newLabels);
    };
    const removeLabel = (index) => setLabels(labels.filter((_, i) => i !== index));

    // Save card
    const handleSave = () => {
        setColumns(prev =>
            prev.map(c =>
                c.id === column.id
                    ? {
                        ...c,
                        cards: c.cards.map(crd =>
                            crd.id === id
                                ? { ...crd, title, description, checklist, labels }
                                : crd
                        ),
                    }
                    : c
            )
        );
        navigate(-1);
    };

    return (
        <div className="bg-[#1D2125] min-h-screen text-white p-4 sm:p-6 md:p-8 flex flex-col gap-6">

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="w-max px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
            >
                Back
            </button>

            {/* Card Container */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-5xl mx-auto">

                {/* Left Side: Title & Description */}
                <div className="flex-1 flex flex-col gap-4">
                    {/* Title */}
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full p-3 text-sm sm:text-base md:text-lg rounded bg-[#22272B] border border-gray-600"
                    />

                    {/* Description */}
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description"
                        rows={4}
                        className="w-full p-3 text-sm sm:text-base md:text-lg rounded bg-[#22272B] border border-gray-600 resize-none"
                    />
                </div>

                {/* Right Side: Checklist & Labels */}
                <div className="flex-1 flex flex-col gap-4">

                    {/* Checklist */}
                    <div className="bg-[#22272B] rounded p-3 border border-gray-600 flex flex-col gap-3 max-h-[40vh] overflow-y-auto">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg">Checklist</h3>
                        {checklist.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => toggleChecklist(idx)}
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                />
                                <input
                                    type="text"
                                    value={item.text}
                                    onChange={e => handleChecklistChange(idx, e.target.value)}
                                    placeholder="Checklist item"
                                    className="flex-1 p-2 text-sm sm:text-base md:text-lg rounded bg-[#1E2428] border border-gray-600 text-white"
                                />
                                <button
                                    onClick={() => removeChecklistItem(idx)}
                                    className="text-red-500 px-1"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addChecklistItem}
                            className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-white w-max"
                        >
                            + Add Item
                        </button>
                    </div>

                    {/* Labels */}
                    <div className="bg-[#22272B] rounded p-3 border border-gray-600 flex flex-col gap-3 max-h-[25vh] overflow-y-auto">
                        <h3 className="font-semibold text-sm sm:text-base md:text-lg">Labels</h3>
                        {labels.map((label, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={label}
                                    onChange={e => handleLabelChange(idx, e.target.value)}
                                    placeholder="Label"
                                    className="flex-1 p-2 text-sm sm:text-base md:text-lg rounded bg-[#1E2428] border border-gray-600 text-white"
                                />
                                <button
                                    onClick={() => removeLabel(idx)}
                                    className="text-red-500 px-1"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addLabel}
                            className="px-2 py-1 bg-green-600 rounded hover:bg-green-700 text-white w-max"
                        >
                            + Add Label
                        </button>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                className="w-full md:w-max px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
            >
                Save
            </button>
        </div>
    );
}
