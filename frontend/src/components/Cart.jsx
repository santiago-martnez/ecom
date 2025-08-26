import React, { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { FiShoppingCart } from "react-icons/fi";

export default function Cart() {
  const { cart, removeFromCart } = useContext(ProductsContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Botón que despliega el carrito */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 bg-white text-green-700 px-4 py-2 rounded shadow hover:bg-green-100"
      >
        <FiShoppingCart />
        <span>Carrito ({cart.length})</span>
      </button>

      {/* Panel desplegable */}
      {open && (
        <div className="absolute left-0 mt-2 w-72 bg-white text-black rounded shadow-lg z-10 p-4">
          <h2 className="text-lg font-bold mb-2">Tu Carrito</h2>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            <ul>
              {cart.map(product => (
                <li key={product._id} className="flex justify-between items-center mb-2">
                  <span>{product.name}</span>
                  <div className="flex items-center space-x-2">
                    <span>${product.price}</span>
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
