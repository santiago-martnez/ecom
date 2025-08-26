import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function Dashboard() {
  const { token, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [compras, setCompras] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const res = await axios.get("/compras", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCompras(res.data);
      } catch (err) {
        setError("No se pudieron cargar las compras");
      }
    };

    const fetchProductos = async () => {
      try {
        const res = await axios.get("/products", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductos(res.data);
      } catch (err) {
        console.error("Error al obtener productos", err);
      }
    };

    if (token) {
      fetchCompras();
      fetchProductos();
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 bg-gray-300 min-h-screen flex flex-col">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            logoutUser();
            navigate("/login");
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Cerrar sesión
        </button>
      </div>


      <h1 className="text-xl font-bold mb-2 text-green-800">Compras recibidas</h1>

      {/* Tabla de Compras */}
      {compras.length === 0 ? (
        <p>No hay compras registradas</p>
      ) : (
        <table className="bg-black w-full border-collapse border border-gray-300 text-white mb-8">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Cliente</th>
              <th className="border p-2">Productos</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra._id}>
                <td className="border p-2">{compra._id}</td>
                <td className="border p-2">
                  {compra.cliente?.nombre} <br />
                  <small>{compra.cliente?.email}</small>
                </td>
                <td className="border p-2">
                  {compra.productos.map((p, i) => (
                    <div key={i}>
                      {p.producto?.name} x {p.cantidad} (${p.subtotal})
                    </div>
                  ))}
                </td>
                <td className="border p-2">${compra.total}</td>
                <td className="border p-2">
                  {new Date(compra.fecha).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Tabla de Productos */}
      <h2 className="text-xl font-bold mb-2 text-green-800">Productos en la tienda</h2>
      <div className="flex justify-between items-center mb-2">
        <span>Total de productos en la tienda: <span className="font-bold text-red-800">{productos.length}</span></span>
        <button
          onClick={() => navigate("/productos/nuevo")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Agregar producto
        </button>
      </div>

      <table className=" bg-black w-full border-collapse border border-gray-300 text-white">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>
      <tbody>
  {productos.map((prod) => (
    <tr
      key={prod._id}
      className={prod.stock === 0 ? "bg-red-400 text-white" : "bg-blue-400 text-white"}
    >
      <td className="border p-2">{prod._id}</td>
      <td className="border p-2">{prod.name}</td>
      <td className="border p-2">${prod.price}</td>
      <td className="border p-2">{prod.stock}</td>
      {/* Columna de acciones */}
      <td className="border p-2 flex gap-2">
        <button
          onClick={() => navigate(`/productos/editar/${prod._id}`)}
          className="p-1 rounded hover:bg-yellow-200"
        >
          <AiOutlineEdit size={20} />
        </button>
        <button
          onClick={() => {
            if (window.confirm("¿Seguro que querés eliminar este producto?")) {
              console.log("Eliminar producto:", prod._id);
            }
          }}
          className="p-1 rounded hover:bg-red-600"
        >
          <AiOutlineDelete size={20} />
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
