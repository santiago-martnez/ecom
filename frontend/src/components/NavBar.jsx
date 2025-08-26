import React, { useState } from "react";
//import { Link } from "react-router-dom";

const categories = ["Todo","Buzos", "Pantalones", "Zapatos", "Remeras"];

export default function NavBar({ onFilter }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:flex bg-green-800 text-white p-4 justify-between items-center">
        <div className="font-bold text-xl">NS<span className="text-green-500">O</span><span className="ml-2">E-COMERCE</span></div>
        <div className="flex space-x-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilter(cat === "Todo" ? null : cat)}
              className="hover:no-underline hover:font-bold "
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav className="md:hidden bg-green-800 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">NS<span className="text-green-500">O</span></div>
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl font-bold select-none"
          aria-label="toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile side menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-900 text-white p-6 transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <h2 className="text-2xl font-bold mb-6">Categorías</h2>
        <div className="flex flex-col space-y-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onFilter(cat);
                setOpen(false);
              }}
              className="text-left hover:underline"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
