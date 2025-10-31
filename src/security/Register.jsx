import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMessage("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setForm({ ...form, picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!specialCharRegex.test(password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find((u) => u.email === form.email);

    if (userExists) {
      setError("❌ Email already registered!");
      return;
    }

    localStorage.setItem("users", JSON.stringify([...existingUsers, form]));
    setMessage("✅ Registered successfully! Redirecting...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0079bf] to-[#026aa7] px-4 sm:px-6">
      <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#026aa7] tracking-wide">
            Trello Register
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <label className="cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-[#026aa7]/20 hover:border-[#026aa7]/40 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-500 text-sm sm:text-base">Upload</span>
                )}
              </div>
            </label>
          </div>

          {/* Inputs */}
          {["name", "mobile", "email", "password", "confirmPassword"].map((field) => (
            <input
              key={field}
              name={field}
              type={
                field.includes("password")
                  ? "password"
                  : field === "email"
                  ? "email"
                  : field === "mobile"
                  ? "tel"
                  : "text"
              }
              placeholder={
                field === "name"
                  ? "Full Name"
                  : field === "mobile"
                  ? "Mobile Number"
                  : field === "email"
                  ? "Email Address"
                  : field === "password"
                  ? "Password (min 8 chars & 1 symbol)"
                  : "Confirm Password"
              }
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#026aa7] focus:border-transparent"
              required
            />
          ))}

          {/* Error / Success Messages */}
          {error && <p className="text-red-500 text-sm sm:text-base text-center">{error}</p>}
          {message && <p className="text-green-600 text-sm sm:text-base text-center">{message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#026aa7] text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#055a8c] transition"
          >
            Register
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm sm:text-base text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#026aa7] font-medium hover:underline">
            Log in
          </Link>
        </p>

        {/* Footer */}
        <div className="mt-6 border-t pt-3 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © {new Date().getFullYear()} Trello — Built with Abdullah
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
