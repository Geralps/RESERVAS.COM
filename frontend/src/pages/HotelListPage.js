import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"; // Assuming 'api' already has your backend base URL

const HotelListPage = () => {
  const [hoteles, setHoteles] = useState([]);

  // --- Backend Base URL Configuration ---
  const BACKEND_STATIC_URL = api.defaults.baseURL || "http://localhost:YOUR_BACKEND_PORT"; // Adjust port if needed

  useEffect(() => {
    // Fetch hotel data from the API
    api.get("/hoteles")
      .then(response => {
        console.log("Datos recibidos de /hoteles:", response.data); // Log: Check raw data
        setHoteles(response.data);
      })
      .catch(error => console.error("Error fetching hotels:", error));
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="container mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Lista de Hoteles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {hoteles.length > 0 ? (
          hoteles.map(hotel => {
            // --- Dynamic Image URL Construction with Space Replacement & Debugging ---
            let imageUrl = null;
            const hotelNameForLog = hotel.nombre || 'Hotel sin nombre'; // For logging

            // Check if hotel.imagen_local has a value
            if (hotel.imagen_local) {
              console.log(`[${hotelNameForLog}] Valor original de hotel.imagen_local:`, hotel.imagen_local); // Log: Check original filename

              // 1. Replace spaces in the filename with hyphens ('-')
              const imageNameProcessed = hotel.imagen_local.replaceAll(' ', '');
              console.log(`[${hotelNameForLog}] Nombre procesado (espacios reemplazados):`, imageNameProcessed); // Log: Check processed filename

              // 2. Encode the processed filename for the URL
              const imageNameEncoded = encodeURIComponent(imageNameProcessed);

              // 3. Construct the full image URL
              imageUrl = `${BACKEND_STATIC_URL}/uploads/${imageNameEncoded}`;
              console.log(`[${hotelNameForLog}] URL de imagen construida:`, imageUrl); // Log: Check final URL

            } else {
              // Log if hotel.imagen_local is missing
              console.warn(`[${hotelNameForLog}] No se encontró valor en hotel.imagen_local. Usando placeholder.`);
            }

            // --- Placeholder Image URL ---
            const placeholderUrl = `https://placehold.co/600x400/E2E8F0/4A5568?text=${encodeURIComponent(hotel.nombre || 'Imagen no disponible')}`; // Updated placeholder text

            return (
              // Hotel Card
              <div key={hotel.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
                {/* Hotel Image */}
                <img
                  src={`http://localhost:5000/uploads/${hotel.imagen_local}` || placeholderUrl}
                  alt={`Imagen de ${hotel.nombre}`}
                  // Log error if image fails to load (triggers placeholder)
                  onError={(e) => {
                    console.error(`[${hotelNameForLog}] Error al cargar imagen desde ${e.target.src}. Mostrando placeholder.`); // Log: Image load error
                    e.target.onerror = null; // Prevent infinite loops
                    e.target.src = placeholderUrl;
                  }}
                  className="w-full h-48 object-cover"
                />
                {/* Hotel Details */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{hotel.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-2">{hotel.ubicacion}</p>
                  {hotel.precio !== undefined ? (
  <p className="text-lg font-bold text-gray-800 mt-auto mb-3">{hotel.precio} COP/noche</p>
) : (
  <p className="text-sm text-gray-500 mt-auto mb-3">Precio no disponible</p>
)}

                  {/* Details Link */}
                  <Link
                    to={`/hoteles/${hotel.id}`}
                    className="mt-auto w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          // Message when no hotels are available
          <p className="text-center text-gray-500 col-span-full mt-8">No hay hoteles disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default HotelListPage;
