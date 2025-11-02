import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Edit2, MoreHorizontal, Trash2 } from "react-feather";
import AddCard from "./AddCard";
import AddMultipleCardsModal from "./AddMultipleCard";
import { useNavigate } from "react-router-dom";

export default function Main({ board, columns, setColumns }) {
    const navigate = useNavigate();
    const initialBoard = board || { id: "default", name: "My Trello Board" };
    const [openMenu, setOpenMenu] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeColumnId, setActiveColumnId] = useState(null);

    // Unified Add Card handler
    const handleAddCard = (columnId, cardData) => {
        let newCard;
        if (typeof cardData === "string") {
            if (!cardData.trim()) return;
            newCard = { id: Date.now().toString(), title: cardData, description: "", checklist: [] };
        } else if (typeof cardData === "object" && cardData !== null) {
            if (!cardData.title?.trim()) return;
            newCard = {
                id: Date.now().toString(),
                title: cardData.title,
                description: cardData.description || "",
                checklist: cardData.checklist || [],
                attachments: cardData.attachments || [],
                labels: cardData.labels || []
            };
        } else return;

        setColumns(prev =>
            prev.map(col => (col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col))
        );
    };

    const handleDeleteCard = (columnId, cardId) => {
        if (!window.confirm("Are you sure you want to delete this card?")) return;
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId ? { ...col, cards: col.cards.filter(c => c.id !== cardId) } : col
            )
        );
    };

    const handleAddColumn = (title) => {
        if (!title?.trim()) return;
        const newColumn = { id: Date.now().toString(), title, cards: [] };
        setColumns(prev => [...prev, newColumn]);
    };

    const handleDeleteColumn = (columnId) => {
        if (!window.confirm("Are you sure you want to delete this list?")) return;
        setColumns(prev => prev.filter(col => col.id !== columnId));
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        setColumns(prev => {
            const newColumns = [...prev];
            const fromCol = newColumns.find(c => c.id === source.droppableId);
            const toCol = newColumns.find(c => c.id === destination.droppableId);
            if (!fromCol || !toCol) return prev;

            const [movedCard] = fromCol.cards.splice(source.index, 1);
            toCol.cards.splice(destination.index, 0, movedCard);
            return newColumns.map(col => ({ ...col, cards: col.cards.filter(Boolean) }));
        });
    };

    const openAddMultipleCard = (columnId) => {
        setActiveColumnId(columnId);
        setModalOpen(true);
        setOpenMenu(null);
    };

    const getChecklistSummary = (card) => {
        if (!card.checklist || card.checklist.length === 0) return "";
        const completed = card.checklist.filter(item => item.completed).length;
        return `✔ ${completed}/${card.checklist.length}`;
    };

    return (
        <div className="flex flex-col bg-[#1D2125] min-h-[calc(100vh-3rem)] w-full">
            <div className="p-3 bg-[#2A2E32] flex justify-between items-center border-b border-[#3A3F45]">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-wide truncate">
                    {initialBoard.name}
                </h2>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-1 overflow-x-auto gap-3 p-3 sm:gap-4 sm:p-4 scrollbar-thin scrollbar-thumb-[#2A2E32] scrollbar-track-transparent">
                    {columns.map((col) => (
                        <Droppable key={col.id} droppableId={col.id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="w-56 sm:w-64 flex-shrink-0 bg-[#2A2E32] rounded-lg p-2 sm:p-3 shadow-lg text-[#B6C2CF] relative"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-sm sm:text-base tracking-wide truncate">{col.title}</span>
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenMenu(openMenu === col.id ? null : col.id)}
                                                className="hover:bg-[#3A3F45] p-1 rounded transition"
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                            {openMenu === col.id && (
                                                <div className="absolute right-0 top-6 bg-[#3A3F45] p-2 rounded shadow-lg z-10 flex flex-col gap-1 text-sm animate-fade-in">
                                                    <button
                                                        className="hover:bg-[#4A4F55] p-1 rounded text-left"
                                                        onClick={() => openAddMultipleCard(col.id)}
                                                    >
                                                        Add Multiple Cards
                                                    </button>
                                                    <button
                                                        className="hover:bg-[#4A4F55] p-1 rounded text-left text-red-400"
                                                        onClick={() => handleDeleteColumn(col.id)}
                                                    >
                                                        Delete List
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2 transition-all duration-200">
                                        {col.cards.map((card, idx) => (
                                            <Draggable key={card.id} draggableId={card.id} index={idx}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-[#22272B] p-2 sm:p-3 rounded-md border border-transparent hover:border-[#3A3F45] cursor-pointer shadow-sm hover:shadow-md transition-all duration-150"
                                                        onClick={() =>
                                                            navigate(`/card/${card.id}`, { state: { cardId: card.id, columnId: col.id } })
                                                        }
                                                    >
                                                        <div className="flex justify-between items-center mb-1">
                                                            <p className="font-medium text-xs sm:text-sm text-white truncate">{card.title}</p>
                                                            <div className="flex gap-1">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        navigate(`/edit-card/${card.id}`, { state: { cardId: card.id, columnId: col.id } });
                                                                    }}
                                                                    className="p-1 hover:bg-[#3A3F45] rounded"
                                                                >
                                                                    <Edit2 size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDeleteCard(col.id, card.id);
                                                                    }}
                                                                    className="p-1 hover:bg-[#3A3F45] rounded text-red-400"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {card.checklist && card.checklist.length > 0 && (
                                                            <p className="text-xs text-gray-400">{getChecklistSummary(card)}</p>
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>

                                    <AddCard onAdd={(title) => handleAddCard(col.id, title)} />
                                </div>
                            )}
                        </Droppable>
                    ))}

                    <div className="w-56 sm:w-64 flex-shrink-0 bg-[#2A2E32]/70 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center border border-dashed border-[#3A3F45] hover:border-[#B6C2CF] cursor-pointer">
                        <button
                            onClick={() => {
                                const title = prompt("Enter new list name (e.g. QA, Review)");
                                if (title) handleAddColumn(title);
                            }}
                            className="text-[#B6C2CF] text-sm sm:text-base hover:text-white transition"
                        >
                            + Add New List
                        </button>
                    </div>
                </div>
            </DragDropContext>

            {modalOpen && activeColumnId && (
                <AddMultipleCardsModal
                    open={modalOpen}
                    columnId={activeColumnId}
                    onClose={() => setModalOpen(false)}
                    onAddCard={handleAddCard}
                />
            )}
        </div>
    );
}
