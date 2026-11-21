// src/pages/DetailView.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCoins } from '../services/coinService';
import type { Coin } from '../services/coinService';
import { useFavoriteStore } from '../store/useFavoriteStore';

export const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  // Conectamos con Zustand para favoritos
  const isFavorite = useFavoriteStore((state) => state.isFavorite(id || ''));
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  useEffect(() => {
    fetchCoins()
      .then(data => {
        const found = data.find(c => c.id === id);
        if (found) {
          setCoin(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: '20px' }}>Cargando detalle...</p>;

  if (notFound || !coin) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>⚠️ Criptomoneda no encontrada</h2>
        <p>El identificador "{id}" no corresponde a ningún registro admitido.</p>
        <Link to="/" style={{ color: '#0066cc', fontWeight: 'bold' }}>&larr; Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>&larr; Volver al listado</Link>
        
        <button 
          onClick={() => toggleFavorite(coin.id)}
          style={{
            padding: '8px 16px',
            backgroundColor: isFavorite ? '#ffcc00' : '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          {isFavorite ? '⭐ Favorito' : '☆ Agregar a favoritos'}
        </button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src={coin.image} alt={coin.name} width={64} height={64} />
          <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
        </div>
        <p><strong>Precio actual:</strong> ${coin.current_price.toLocaleString()}</p>
        <p><strong>Capitalización de mercado:</strong> ${coin.market_cap.toLocaleString()}</p>
        <p><strong>Volumen total:</strong> ${coin.total_volume.toLocaleString()}</p>
        <p style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
          <strong>Variación 24h:</strong> {coin.price_change_percentage_24h?.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};