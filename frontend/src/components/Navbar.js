// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold">reservas.com</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200 transition">Inicio</Link>
          <Link to="/hoteles" className="hover:text-gray-200 transition">Hoteles</Link>
          <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
          <Link to="/registro" className="hover:text-gray-200 transition">Registro</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
