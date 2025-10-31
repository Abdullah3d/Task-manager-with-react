import React, { useState } from "react";
import { Edit2, MoreHorizontal, Trash2 } from "react-feather";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AddCard from "./AddCard";
import AddMultipleCardsModal from "./AddMultipleCard";

export default function Main({ board }) {
    const initialBoard = board || { id: "default", name: "My Trello Board" };

    const [columns, setColumns] = useState([
        { id: "1", title: "To Do", cards: [{ title: "Project Description" }] },
        { id: "2", title: "In Progress", cards: [{ title: "Implement Feature A" }] },
        { id: "3", title: "Done", cards: [{ title: "Setup Project Repo" }] },
    ]);

    const [openMenu, setOpenMenu] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [activeColumnId, setActiveColumnId] = useState(null);

    const handleAddCard = (columnId, cardData) => {
        setColumns((prev) =>
            prev.map((col) =>
                col.id === columnId ? { ...col, cards: [...col.cards, cardData] } : col
            )
        );
    };

    const handleDeleteCard = (columnId, cardIndex) => {
        if (!window.confirm("Are you sure you want to delete this card?")) return;
        setColumns((prev) =>
            prev.map((col) =>
                col.id === columnId
                    ? { ...col, cards: col.cards.filter((_, idx) => idx !== cardIndex) }
                    : col
            )
        );
    };

    const handleAddColumn = (title) => {
        const newColumn = { id: Date.now().toString(), title, cards: [] };
        setColumns((prev) => [...prev, newColumn]);
    };

    const handleDeleteColumn = (columnId) => {
        if (!window.confirm("Are you sure you want to delete this list?")) return;
        setColumns((prev) => prev.filter((col) => col.id !== columnId));
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return;

        setColumns((prev) => {
            const newColumns = [...prev];
            const fromCol = newColumns.find((c) => c.id === source.droppableId);
            const toCol = newColumns.find((c) => c.id === destination.droppableId);
            const [movedCard] = fromCol.cards.splice(source.index, 1);
            toCol.cards.splice(destination.index, 0, movedCard);
            return newColumns;
        });
    };

    const openAddMultipleCardsModal = (columnId) => {
        setActiveColumnId(columnId);
        setModalOpen(true);
        setOpenMenu(null);
    };

    return (
        <div className="flex flex-col bg-[#1D2125] min-h-[calc(100vh-3rem)] w-full">
            {/* Board Header */}
            <div className="p-3 bg-[#2A2E32] flex justify-between items-center border-b border-[#3A3F45]">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-wide truncate">
                    {initialBoard.name}
                </h2>
            </div>

            {/* Columns */}
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
                                    {/* Column Header */}
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-sm sm:text-base tracking-wide truncate">
                                            {col.title}
                                        </span>
                                        <div className="relative">
                                            <button
                                                onClick={() =>
                                                    setOpenMenu(openMenu === col.id ? null : col.id)
                                                }
                                                className="hover:bg-[#3A3F45] p-1 rounded transition"
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                            {openMenu === col.id && (
                                                <div className="absolute right-0 top-6 bg-[#3A3F45] p-2 rounded shadow-lg z-10 flex flex-col gap-1 text-sm">
                                                    <button
                                                        className="hover:bg-[#4A4F55] p-1 rounded text-left"
                                                        onClick={() => openAddMultipleCardsModal(col.id)}
                                                    >
                                                        ➕ Add Multiple Cards
                                                    </button>
                                                    <button
                                                        className="hover:bg-[#4A4F55] p-1 rounded text-left text-red-400"
                                                        onClick={() => handleDeleteColumn(col.id)}
                                                    >
                                                        🗑 Delete List
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cards */}
                                    <div className="space-y-2">
                                        {col.cards.map((card, idx) => (
                                            <Draggable
                                                key={`${col.id}-${idx}`}
                                                draggableId={`${col.id}-${idx}`}
                                                index={idx}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-[#22272B] p-2 sm:p-3 rounded-md border border-transparent hover:border-[#3A3F45] cursor-pointer shadow-sm hover:shadow-md transition"
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-medium text-xs sm:text-sm text-white truncate">
                                                                {card.title}
                                                            </p>
                                                            <div className="flex gap-1">
                                                                <button className="p-1 hover:bg-[#3A3F45] rounded">
                                                                    <Edit2 size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteCard(col.id, idx)}
                                                                    className="p-1 hover:bg-[#3A3F45] rounded text-red-400"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>

                                    {/* Add Single Card */}
                                    <AddCard onAdd={(title) => handleAddCard(col.id, { title })} />
                                </div>
                            )}
                        </Droppable>
                    ))}

                    {/* Add New Column */}
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

            {/* Modal */}
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
