import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); // Clear error on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (!form.email || !form.password) {
            setError("All fields are required!");
            return;
        }

        // Safely get users from localStorage
        let users = [];
        try {
            users = JSON.parse(localStorage.getItem("users")) || [];
        } catch {
            users = [];
        }

        // Find matching user
        const matchedUser = users.find(
            (u) => u?.email === form.email && u?.password === form.password
        );

        if (matchedUser) {
            // Only store minimal info
            const minimalUser = {
                email: matchedUser.email,
                name: matchedUser.name || "",
                id: matchedUser.id || "",
            };
            try {
                localStorage.setItem("loggedInUser", JSON.stringify(minimalUser));
                if (onLogin) onLogin();
                navigate("/");
            } catch (e) {
                console.error("localStorage full:", e);
                setError("Unable to log in. Storage is full.");
            }
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-700 to-green-500">
            <div className="bg-white p-10 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-all"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-yellow-500">
                    <Link to="/register" className="hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
