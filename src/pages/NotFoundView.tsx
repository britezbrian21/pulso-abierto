// src/pages/NotFoundView.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundView: React.FC = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>404 - Dirección inexistente</h1>
      <p>La ruta a la que intentas acceder no existe en Pulso Abierto.</p>
      <Link to="/" style={{ color: '#0066cc', fontWeight: 'bold', textDecoration: 'underline' }}>
        Volver a la página principal
      </Link>
    </div>
  );
};