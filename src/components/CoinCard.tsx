// src/components/CoinCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { Coin } from '../services/coinService';
import { useFavoriteStore } from '../store/useFavoriteStore';

interface CoinCardProps {
  coin: Coin;
  onSelect?: (coin: Coin) => void;
}

export const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  // Usamos Zustand para saber si es favorito y la función para cambiarlo
  const isFavorite = useFavoriteStore((state) => state.isFavorite(coin.id));
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  return (
    <div className="coin-card" style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', margin: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={coin.image} alt={coin.name} width={32} height={32} />
        <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
      </div>
      
      <p><strong>Precio:</strong> ${coin.current_price.toLocaleString()}</p>
      <p style={{ color: coin.price_change_percentage_24h >= 0 ? 'green' : 'red' }}>
        <strong>Cambio 24h:</strong> {coin.price_change_percentage_24h?.toFixed(2)}%
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
        <Link to={`/criptomonedas/${coin.id}`} style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
          Ver detalle &rarr;
        </Link>

        <button 
          onClick={() => toggleFavorite(coin.id)}
          style={{
            padding: '6px 12px',
            backgroundColor: isFavorite ? '#ffcc00' : '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isFavorite ? '⭐ Favorito' : '☆ Agregar'}
        </button>
      </div>
    </div>
  );
};