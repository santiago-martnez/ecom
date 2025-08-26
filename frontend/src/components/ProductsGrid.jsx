import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import React from 'react';
import { useNavigate } from "react-router-dom";

//const BACKEND_URL = "https://ecom-1-n1x3.onrender.com"; // ESTA LINEA TENIA ANTES
const BACKEND_URL = import.meta.env.VITE_API_URL;

export default function ProductsGrid() {
  const { addToCart, products, loading, error } = useContext(ProductsContext);
  const navigate = useNavigate();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <div className="relative p-4">
      {/* Botón volver */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-0 left-0 mt-4 ml-4 text-green-700 font-semibold hover:text-green-900"
      >
        ← Volver
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-4 sm:p-8">
        {products.map(product => (
          <div key={product._id} className="bg-gradient-to-r from-green-400 via-green-600 to-green-400 animate-gradient-move p-4 rounded shadow hover:shadow-lg transition">
            <img
              src={product.image ? `${BACKEND_URL}${product.image}` : "https://via.placeholder.com/300"}
              alt={product.name}
              className="mb-4 w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl font-semibold">{product.name}</h2>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-600 text-sm sm:text-base max-w-[70%]">
                {product.description}
              </p>
              <button 
                onClick={() => addToCart(product)} 
                className="bg-white text-green-700 font-semibold px-4 py-2 rounded hover:bg-green-100 transition"
              >
                Comprar
              </button>
            </div>
            <p className="mt-2 font-bold text-base sm:text-lg">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
