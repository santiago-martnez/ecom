import React, { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      loginUser(data.token);
      navigate("/dashboard"); // ruta protegida
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto relative">
      {/* Botón volver */}
      <button
        onClick={() => navigate("/")} 
        className="absolute top-0 left-0 mt-4 ml-4 text-green-700 font-semibold hover:text-green-900"
      >
        ← Volver
      </button>

      <h1 className="text-2xl font-bold mb-4 mt-8">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-green-700 text-white py-2 rounded hover:bg-green-800"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
