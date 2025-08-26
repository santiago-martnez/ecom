import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-green-900">
      {/* Botón arriba a la derecha */}
      <Link to="/login">
       <button className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">
        Iniciar sesión
      </button>
      </Link>
     

      {/* Contenido centrado */}
      <h1 className="text-3xl font-bold mb-6 text-white">Bienvenido a mi Tienda</h1>
      <Link to="/products">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700">
          Ver productos
        </button>
      </Link>
    </div>
  );
}
