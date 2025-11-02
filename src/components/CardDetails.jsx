import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CardDetails({ columns }) {
    const navigate = useNavigate();
    const { id } = useParams();

    // Find the card and its column
    const column = columns.find(col => col.cards.some(c => c.id === id));
    const card = column?.cards.find(c => c.id === id);

    if (!card)
        return (
            <p className="p-4 text-white text-center text-lg">Card not found</p>
        );

    // Checklist summary
    const completedCount = card.checklist?.filter(item => item.completed).length || 0;
    const totalCount = card.checklist?.length || 0;

    return (
        <div className="bg-[#1D2125] min-h-screen text-white flex flex-col p-4 sm:p-6 md:p-8">

            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-3 py-1 sm:px-4 sm:py-2 bg-gray-700 rounded hover:bg-gray-600 transition w-max"
            >
                Back
            </button>

            {/* Card Container */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-5xl mx-auto">

                {/* Left Side: Title & Description */}
                <div className="flex-1 flex flex-col gap-4">
                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">
                        {card.title}
                    </h2>

                    {/* Description */}
                    {card.description && (
                        <p className="p-3 bg-[#22272B] rounded border border-gray-600 text-sm sm:text-base md:text-lg whitespace-pre-wrap break-words">
                            {card.description}
                        </p>
                    )}

                    {/* Labels */}
                    {card.labels && card.labels.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {card.labels.map((label, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 bg-blue-600 rounded text-xs sm:text-sm md:text-base"
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: Checklist */}
                {card.checklist && card.checklist.length > 0 && (
                    <div className="flex-1 bg-[#22272B] rounded p-3 md:p-4 border border-gray-600">
                        <h3 className="font-semibold mb-3 text-sm sm:text-base md:text-lg">
                            Checklist ({completedCount}/{totalCount})
                        </h3>
                        <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
                            {card.checklist.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={item.completed}
                                        readOnly
                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                    />
                                    <span
                                        className={`text-sm sm:text-base md:text-lg ${item.completed ? "line-through text-gray-400" : ""
                                            }`}
                                    >
                                        {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
