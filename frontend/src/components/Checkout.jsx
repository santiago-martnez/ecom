import React, { useState, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default function CheckoutButton() {
  const { cart } = useContext(ProductsContext);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cliente, setCliente] = useState({ nombre: "", email: "" });

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(p => ({
            title: p.name,
            quantity: p.cantidad || 1,
            unit_price: p.price,
            currency_id: "ARS"
          })),
          cliente
        })
      });

      const data = await response.json();
      window.location.href = data.init_point;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSubmitModal = (e) => {
    e.preventDefault();
    if (cliente.nombre && cliente.email) {
      setModalOpen(false);
      handleCheckout();
    } else {
      alert("Por favor, completa nombre y email.");
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        disabled={loading || cart.length === 0}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
      >
        {loading ? "Procesando..." : "Pagar con MercadoPago"}
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-lg font-bold mb-4 text-black">Completa tus datos (importante para registrar el pago)</h2>
            <form onSubmit={handleSubmitModal} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nombre"
                value={cliente.nombre}
                onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
                className="border-2 border-gray-700 px-2 py-1 rounded focus:outline-none focus:border-green-700 text-black"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={cliente.email}
                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                className="border-2 border-gray-700 px-2 py-1 rounded focus:outline-none focus:border-green-700 text-black"
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-3 py-1 rounded border"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-green-700 text-white"
                >
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
