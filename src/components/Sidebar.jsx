import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'react-feather';
import { Popover } from 'react-tiny-popover';

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [boards, setBoards] = useState([
        { id: 1, name: "My Trello Board" },
    ]);
    const [newBoardName, setNewBoardName] = useState("");

    const addBoard = () => {
        if (!newBoardName.trim()) return;
        setBoards(prev => [
            ...prev,
            { id: Date.now(), name: newBoardName.trim() },
        ]);
        setNewBoardName("");
        setShowPop(false);
    };

    return (
        <div
            className={`bg-gradient-to-r from-[#0d171c] via-[#2c4a34] to-[#eddd53] h-[calc(100vh-3rem)] border-r border-[#B6c2cf] transition-all duration-500 flex-shrink-0 ${collapsed ? 'w-[40px]' : 'w-[280px]'}`}
        >
            {collapsed ? (
                <div className='p-2'>
                    <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-green-400 rounded-sm'>
                        <ChevronRight size={18} />
                    </button>
                </div>
            ) : (
                <div>
                    {/* Workspace Header */}
                    <div className='workspace p-3 flex justify-between border-b border-b-[#B6c2cf]'>
                        <h4>Remote Dev's Workspace</h4>
                        <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-green-400 rounded-sm p-1'>
                            <ChevronLeft size={18} />
                        </button>
                    </div>

                    {/* Boards List */}
                    <div className="boardList">
                        <div className='flex justify-between px-3 py-2'>
                            <h6>Your Boards</h6>

                            <Popover
                                isOpen={showPop}
                                positions={['right', 'top', 'bottom', 'left']}
                                content={
                                    <div className='bg-white text-black p-2 rounded shadow-lg z-[9999] flex flex-col gap-2'>
                                        <input
                                            type="text"
                                            value={newBoardName}
                                            onChange={(e) => setNewBoardName(e.target.value)}
                                            placeholder="Enter board name"
                                            className='p-1 border border-gray-300 rounded focus:outline-none'
                                        />
                                        <button
                                            onClick={addBoard}
                                            className='bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700'
                                        >
                                            Add Board
                                        </button>
                                    </div>
                                }
                            >
                                <button onClick={() => setShowPop(!showPop)} className='hover:bg-green-400 rounded-sm p-1'>
                                    <Plus size={16} />
                                </button>
                            </Popover>
                        </div>
                    </div>

                    {/* Render Boards Dynamically */}
                    <ul>
                        {boards.map((board) => (
                            <li key={board.id}>
                                <button className='px-3 py-2 w-full text-sm flex justify-start items-center hover:text-[#B6c2cf]'>
                                    <span className='w-6 h-4 rounded-sm mr-2 bg-red-600'>&nbsp;</span>
                                    <span>{board.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
