import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardDetails() {
    const navigate = useNavigate();
    const { state } = useLocation();
    if (!state) return <div>Card not found</div>;

    const { cardId, columnId, columns } = state;

    const column = columns.find((col) => col.id === columnId);
    if (!column) return <div>Column not found</div>;

    const card = column.cards.find((c) => c.id === cardId);
    if (!card) return <div>Card not found</div>;

    return (
        <div className="p-4 min-h-screen bg-[#1D2125] text-white">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-3 py-1 rounded bg-[#3A3F45] hover:bg-[#4A4F55]"
            >
                Back
            </button>
            <h1 className="text-2xl font-bold mb-2">{card.title}</h1>
            <p className="mb-4">{card.description || "No description yet."}</p>

            <h2 className="text-lg font-semibold mb-2">Checklist</h2>
            <ul className="mb-4">
                {card.checklist.length ? (
                    card.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <input type="checkbox" checked={item.completed} readOnly />
                            <span>{item.text}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-400">No checklist items.</p>
                )}
            </ul>
        </div>
    );
}
