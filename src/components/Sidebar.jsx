import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, Home, Layout } from "react-feather";
import { Popover } from "react-tiny-popover";

export default function Sidebar({ onSelectBoard }) {
    const [collapsed, setCollapsed] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [boards, setBoards] = useState([{ id: 1, name: "My Trello Board" }]);
    const [newBoardName, setNewBoardName] = useState("");

    const addBoard = () => {
        if (!newBoardName.trim()) return;
        const newBoard = { id: Date.now(), name: newBoardName.trim() };
        setBoards((prev) => [...prev, newBoard]);
        setNewBoardName("");
        setShowPop(false);
    };

    const deleteBoard = (id) => {
        if (!window.confirm("Are you sure you want to delete this board?")) return;
        setBoards((prev) => prev.filter((board) => board.id !== id));
    };

    return (
        <div
            className={`bg-[#1D2125] text-white h-screen flex flex-col transition-all duration-500
        ${collapsed ? "w-[64px]" : "w-[260px] sm:w-[280px] md:w-[300px]"}`
            }
        >
            {/* Top Section */}
            <div className="flex items-center justify-between px-3 py-4 border-b border-[#31383F]">
                {!collapsed && (
                    <h2 className="text-lg font-semibold tracking-wide text-[#B6C2CF] truncate">
                        Workspaces
                    </h2>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="hover:bg-[#2A2E32] p-1 rounded-md"
                >
                    {collapsed ? (
                        <ChevronRight size={18} className="text-[#B6C2CF]" />
                    ) : (
                        <ChevronLeft size={18} className="text-[#B6C2CF]" />
                    )}
                </button>
            </div>

            {/* Workspace Navigation */}
            {!collapsed && (
                <div className="flex flex-col px-3 py-3 border-b border-[#31383F] space-y-2">
                    <button className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#2A2E32] transition truncate">
                        <Home size={16} className="text-[#B6C2CF]" />
                        <span className="text-sm text-[#B6C2CF] truncate">Home</span>
                    </button>
                    <button className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#2A2E32] transition truncate">
                        <Layout size={16} className="text-[#B6C2CF]" />
                        <span className="text-sm text-[#B6C2CF] truncate">Boards</span>
                    </button>
                </div>
            )}

            {/* Boards Section */}
            <div className="flex justify-between items-center px-3 mt-3 mb-1">
                {!collapsed && <h4 className="text-sm text-[#B6C2CF] font-medium truncate">Your Boards</h4>}

                <Popover
                    isOpen={showPop}
                    positions={["right", "bottom"]}
                    onClickOutside={() => setShowPop(false)}
                    content={
                        <div className="bg-white text-black p-3 rounded-md shadow-md w-48 sm:w-56">
                            <input
                                type="text"
                                value={newBoardName}
                                onChange={(e) => setNewBoardName(e.target.value)}
                                placeholder="Enter board name"
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button
                                onClick={addBoard}
                                className="w-full bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700 transition"
                            >
                                Add Board
                            </button>
                        </div>
                    }
                >
                    <button
                        onClick={() => setShowPop(!showPop)}
                        className="p-1 hover:bg-[#2A2E32] rounded-md"
                    >
                        <Plus size={16} className="text-[#B6C2CF]" />
                    </button>
                </Popover>
            </div>

            {/* Board List */}
            <ul className="overflow-y-auto flex-1 px-1">
                {boards.map((board) => (
                    <li
                        key={board.id}
                        className="flex justify-between items-center px-2 py-1 rounded-md hover:bg-[#2A2E32] group"
                    >
                        <button
                            onClick={() => onSelectBoard(board)}
                            className="flex items-center gap-2 flex-grow text-sm text-[#B6C2CF] text-left truncate"
                        >
                            <span className="w-3 h-3 bg-blue-500 rounded-sm flex-shrink-0" />
                            {!collapsed && <span className="truncate">{board.name}</span>}
                        </button>

                        {/* Delete Icon */}
                        {!collapsed && (
                            <button
                                onClick={() => deleteBoard(board.id)}
                                className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-600 rounded"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}