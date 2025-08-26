import React, { useState } from "react";
//import { Link } from "react-router-dom";

const categories = ["Buzos", "Pantalones", "Zapatos", "Accesorios"];

export default function NavBar({ onFilter }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
    <footer className="bg-green-800 text-white py-4">
        <div className="container mx-auto text-center">
            <p>&copy; Design by <span className="font-semibold">Santiago Martínez</span>.</p>
        </div>
    </footer>
</div>
  );
}
