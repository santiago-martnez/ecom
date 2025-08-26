import React, { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AgregarProducto() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!image) {
      setError("Debes seleccionar una imagen");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard"); // volver al dashboard
    } catch (err) {
      setError("Error al agregar producto");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-green-100 min-h-screen flex flex-col items-center">
      {/* Flecha volver */}
      <div className="self-start mb-4 cursor-pointer flex items-center text-green-800 font-semibold"
           onClick={() => navigate("/dashboard")}>
        <span className="mr-2 text-2xl">&#8592;</span> Volver
      </div>

      <h1 className="text-2xl font-bold mb-4 text-green-800">Agregar Producto</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Precio:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Stock:
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </label>

        <label className="block mb-4">
          Imagen:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
          disabled={loading}
        >
          {loading ? "Agregando..." : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
}
