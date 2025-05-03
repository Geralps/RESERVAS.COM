import React from "react";
import miImagen from '../assets/reservasimage.png';

const HomePage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>Bienvenido a Tu app de reserva de hoteles</h1>
      <p>Encuentra los mejores hoteles al mejor precio.</p>
      <img 
        src={miImagen} 
        alt="Imagen de reservas" 
        style={{
          width: '100%',
          maxWidth: '600px',
          borderRadius: '10px',
          marginTop: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }} 
      />
    </div>
  );
};

export default HomePage;
