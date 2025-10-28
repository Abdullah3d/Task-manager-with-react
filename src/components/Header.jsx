import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <header className="bg-gradient-to-r from-[#2a7b9b] via-[#5f996f] to-[#eddd53] w-full h-12 border-b border-[#B6c2cf] flex items-center justify-between px-4 shadow-md">
            {/* Left Section */}
            <div className="flex items-center space-x-3">
                <h3 className="text-white text-lg font-semibold tracking-wide">Trello</h3>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3 text-white">
                <span className="font-medium">Trello Task Manager</span>

                {user && (
                    <div className="flex items-center space-x-2">
                        <img
                            src={user.picture || "https://via.placeholder.com/28"}
                            alt="user"
                            className="w-8 h-8 rounded-full border border-white/40"
                        />
                        <span className="text-white font-medium">{user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
