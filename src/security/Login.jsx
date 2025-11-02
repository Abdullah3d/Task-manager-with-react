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

    // ✅ Get registered user safely
    let savedUser = null;
    try {
      savedUser = JSON.parse(localStorage.getItem("user"));
    } catch {
      savedUser = null;
    }

    if (
      savedUser &&
      savedUser.email === form.email &&
      savedUser.password === form.password
    ) {
      // ✅ Safe login storage
      try {
        // only store small, essential data
        const minimalUser = {
          email: savedUser.email,
          name: savedUser.name || "",
          picture: savedUser.picture || "",
        };

        localStorage.setItem("loggedInUser", JSON.stringify(minimalUser));
        if (onLogin) onLogin();
        navigate("/");
      } catch (error) {
        console.warn("LocalStorage is full, clearing old data…", error);
        localStorage.clear(); // clear storage safely
        setError("Storage full. Please try again — cache cleared.");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4 sm:px-6">
      {/* Logo area */}
      <div className="mb-8 sm:mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-800 tracking-tight">
          Trello
        </h1>
        <p className="text-gray-700 mt-1 text-sm sm:text-base">
          Log in to continue to your boards
        </p>
      </div>

      {/* Login card */}
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
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
              className="w-full p-3 sm:p-4 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 sm:p-4 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm sm:text-base font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full p-3 sm:p-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200"
          >
            Log in
          </button>
        </form>

        <div className="mt-5 sm:mt-6 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 sm:mt-10 text-gray-600 text-sm sm:text-base text-center">
        <p>© 2025 Trello — Built by Abdullah</p>
      </div>
    </div>
  );
};

export default Login;
