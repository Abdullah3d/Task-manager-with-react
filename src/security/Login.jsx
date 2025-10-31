import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setError("All fields are required!");
            return;
        }

        let users = [];
        try {
            users = JSON.parse(localStorage.getItem("users")) || [];
        } catch {
            users = [];
        }

        const matchedUser = users.find(
            (u) => u?.email === form.email && u?.password === form.password
        );

        if (matchedUser) {
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
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            {/* Trello logo area */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-blue-800 tracking-tight">
                    Trello
                </h1>
                <p className="text-gray-700 mt-1">Log in to continue to your boards</p>
            </div>

            {/* Login card */}
            <div className="bg-white w-96 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Log in
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full p-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200"
                    >
                        Log in
                    </button>
                </form>

                <div className="mt-5 text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-gray-600 text-sm text-center">
                <p>© 2025 Trello — Built with Abdullah</p>
            </div>
        </div>
    );
};

export default Login;
