import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ 
    email: "", 
    password: "",
    ...(!isLogin && { name: "" }) 
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setForm(prev => ({ 
      email: prev.email, 
      password: "",
      ...(!isLogin && { name: "" })
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let res;
      
      if (isLogin) {
        // Login - POST /api/auth/sign-in
        res = await api.post("auth/sign-in", {
          email: form.email,
          password: form.password
        });
      } else {
        // Register - POST /api/auth/sign-up
        res = await api.post("auth/sign-up", {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "user"
        });
      }

      // Your backend returns { message, user } - token is HTTP-only cookie
      // The axios interceptor will automatically include the cookie in future requests
      console.log("Auth successful:", res);
      
      // Navigate to journal on success
      navigate("/journal");
      
    } catch (err) {
      console.error("Auth failed:", err);
      
      // Handle error response format from your backend
      const errorMessage = err.error || err.message || `Failed to ${isLogin ? "log in" : "register"}`;
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name || ""}
            onChange={handleChange}
            className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
            required={!isLogin}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          required
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-2 rounded font-semibold"
        >
          {isLogin ? "Log In" : "Register"}
        </button>

        <button
          type="button"
          onClick={toggleMode}
          className="text-sm mt-4 text-indigo-400 hover:underline"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Log in"}
        </button>
      </form>
    </div>
  );
}