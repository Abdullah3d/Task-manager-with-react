import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, HelpCircle, Plus } from "react-feather";

export default function Header({ onLogout }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        setUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setUser(null);
        if (onLogout) onLogout();
        navigate("/login");
    };

    return (
        <header className="bg-[#1D2125] h-14 w-full flex items-center justify-between px-4 sm:px-6 border-b border-[#31383F] shadow-sm">

            {/* Left Section */}
            <div className="flex items-center space-x-3 sm:space-x-4">
                <h1
                    className="text-[#B6C2CF] text-lg font-bold tracking-wide cursor-pointer hover:text-white transition"
                    onClick={() => navigate("/")}
                >
                    Trello
                </h1>

                {/* Workspace / Boards Button */}
                <button className="hidden sm:flex items-center gap-1 bg-[#2A2E32] text-[#B6C2CF] text-sm px-3 py-1 rounded hover:bg-[#383D42] transition">
                    <Plus size={14} />
                    Create
                </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Optional Icons */}
                <button className="p-1 rounded hover:bg-[#2A2E32] transition">
                    <Bell size={18} className="text-[#B6C2CF]" />
                </button>
                <button className="p-1 rounded hover:bg-[#2A2E32] transition">
                    <HelpCircle size={18} className="text-[#B6C2CF]" />
                </button>

                {/* User Info */}
                {user && (
                    <div className="flex items-center space-x-2">
                        <img
                            src={user.picture || "https://via.placeholder.com/28"}
                            alt="user"
                            className="w-8 h-8 rounded-full border border-[#2A2E32]"
                        />
                        <span className="text-sm text-[#B6C2CF] font-medium hidden sm:block">
                            {user.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
