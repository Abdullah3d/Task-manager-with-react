import React, { useState } from "react";
import { Edit2, MoreHorizontal, UserPlus, Trash2 } from "react-feather";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AddCard from "./AddCard";
import AddMultipleCardsModal from "./AddMultipleCard";

export default function Main() {
    const [columns, setColumns] = useState([
        { id: "1", title: "To Do", cards: [{ title: "Project Description" }] },
        { id: "2", title: "In Progress", cards: [{ title: "Implement Feature A" }] },
        { id: "3", title: "Done", cards: [{ title: "Setup Project Repo" }] },
    ]);

    const [openMenu, setOpenMenu] = useState(null); // which column menu is open
    const [modalOpen, setModalOpen] = useState(false);
    const [activeColumnId, setActiveColumnId] = useState(null);

    const handleAddCard = (columnId, cardData) => {
        setColumns(prev =>
            prev.map(col =>
                col.id === columnId
                    ? { ...col, cards: [...col.cards, cardData] }
                    : col
            )
        );
    };

    const handleDeleteCard = (columnId, cardIndex) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this card?");
        if (!confirmDelete) return;

        setColumns(prev =>
            prev.map(col =>
                col.id === columnId
                    ? { ...col, cards: col.cards.filter((_, idx) => idx !== cardIndex) }
                    : col
            )
        );
    };

    const handleAddColumn = (title) => {
        const newColumn = {
            id: Date.now().toString(),
            title,
            cards: [],
        };
        setColumns(prev => [...prev, newColumn]);
    };

    const handleDeleteColumn = (columnId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this stage?");
        if (!confirmDelete) return;
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
            const [movedCard] = fromCol.cards.splice(source.index, 1);
            toCol.cards.splice(destination.index, 0, movedCard);
            return newColumns;
        });
    };

    const openAddMultipleCardsModal = (columnId) => {
        setActiveColumnId(columnId);
        setModalOpen(true);
        setOpenMenu(null); // close the menu
    };

    return (
        <div className="flex flex-col bg-gradient-to-r from-[#2a7b9b] via-[#5f996f] to-[#eddd53] min-h-[calc(100vh-3rem)] border-r border-[#B6c2cf] w-full">
            {/* Header */}
            <div className="p-3 bg-[#1f1f1f]/70 flex justify-between items-center border-b border-[#B6c2cf] backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white tracking-wide">My Trello Board</h2>
                <div className="flex items-center space-x-2">
                    <button className="flex items-center bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 transition">
                        <UserPlus size={16} className="mr-1" /> Share
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-2 py-1.5 rounded-md hover:bg-gray-300 transition">
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>

            {/* Drag & Drop Columns */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="flex flex-1 overflow-x-auto gap-4 p-4">
                    {columns.map(col => (
                        <Droppable key={col.id} droppableId={col.id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="w-64 flex-shrink-0 bg-[#0e0e0e]/80 rounded-xl p-3 shadow-md border border-[#3a3a3a] text-gray-200 relative"
                                >
                                    {/* Column Header */}
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">{col.title}</span>
                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenMenu(openMenu === col.id ? null : col.id)}
                                                className="hover:bg-gray-700 p-1 rounded-sm transition"
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                            {openMenu === col.id && (
                                                <div className="absolute right-0 top-6 bg-gray-800 p-2 rounded shadow-md z-10 flex flex-col gap-1">
                                                    <button
                                                        className="hover:bg-gray-700 p-1 rounded"
                                                        onClick={() => openAddMultipleCardsModal(col.id)}
                                                    >
                                                        Add Multiple Cards
                                                    </button>
                                                    <button
                                                        className="hover:bg-gray-700 p-1 rounded"
                                                        onClick={() => handleDeleteColumn(col.id)}
                                                    >
                                                        Delete Stage
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
                                                        className="flex justify-between items-center bg-[#1f1f1f] p-2 rounded-md border border-transparent hover:border-gray-600 cursor-pointer transition"
                                                    >
                                                        <div>
                                                            <p className="font-semibold text-sm">{card.title}</p>
                                                            {card.description && (
                                                                <p className="text-xs text-gray-300">{card.description}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <button className="bg-gray-700 p-1 rounded-sm hover:bg-gray-600 transition">
                                                                <Edit2 size={14} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteCard(col.id, idx)}
                                                                className="bg-red-600 p-1 rounded-sm hover:bg-red-700 transition"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>

                                    {/* Add single card */}
                                    <AddCard onAdd={(title) => handleAddCard(col.id, { title })} />
                                </div>
                            )}
                        </Droppable>
                    ))}

                    {/* Add New Column */}
                    <div className="w-64 flex-shrink-0 bg-[#1f1f1f]/70 rounded-xl p-3 flex flex-col items-center justify-center border border-dashed border-gray-500 hover:border-gray-300 cursor-pointer">
                        <button
                            onClick={() => {
                                const title = prompt("Enter new stage name (e.g. QA, Review, Testing)");
                                if (title) handleAddColumn(title);
                            }}
                            className="text-gray-300 hover:text-white transition"
                        >
                            + Add New Stage
                        </button>
                    </div>
                </div>
            </DragDropContext>

            {/* Add Multiple Cards Modal */}
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
