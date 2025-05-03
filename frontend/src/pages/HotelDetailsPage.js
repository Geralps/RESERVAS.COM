import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    api.get(`/hoteles/${id}`)
      .then(response => setHotel(response.data))
      .catch(error => console.error("Error al obtener detalles", error));
      // 📌 Verifica la respuesta
  }, [id]);

  if (!hotel) return <p>Cargando...</p>;

  return (
    <div className="hotel-detail">
      <img src={hotel.imagen} alt={hotel.nombre} className="hotel-image" />
      <p>{hotel.descripcion}</p>
      <p><strong>Precio:</strong> {hotel.precio} $/noche</p>
      <div className="rating">
        {"⭐".repeat(hotel.puntuacion)} ({hotel.puntuacion}⭐5/5)
      </div>
      <button className="btn-reservar">Reservar</button>
    </div>
  );
};

export default HotelDetailsPage;
