
import React, { useEffect, useState } from 'react';
import { fetchCoins } from '../services/coinService';
import type { Coin } from '../services/coinService';
import { CoinCard } from '../components/CoinCard';
import { SearchForm } from '../components/SearchForm';

export const HomeView: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [coinFilter, setCoinFilter] = useState<string>('all');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCoins();
      setCoins(data);
    } catch (err) {
      setError('No se pudieron cargar los datos de la API. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  
  const filteredCoins = coins.filter(coin => {
    const matchesText = coin.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSelect = coinFilter === 'all' || coin.id === coinFilter;
    return matchesText && matchesSelect;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Pulso Abierto - Criptomonedas (React)</h1>
      
      <SearchForm onSearch={(query, filter) => {
        setSearchQuery(query);
        setCoinFilter(filter);
      }} />

      {/* Estado de carga */}
      {loading && <p aria-live="polite">Cargando criptomonedas...</p>}

      {/* Estado de error con opción de reintentar */}
      {error && (
        <div style={{ color: '#d9534f', margin: '20px 0' }} role="alert">
          <p>⚠️ {error}</p>
          <button onClick={loadData} style={{ padding: '8px 16px', background: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Reintentar
          </button>
        </div>
      )}

      {/* Resultado / Ausencia de datos */}
      {!loading && !error && (
        <div>
          <h2>Resultados ({filteredCoins.length} encontrados)</h2>
          {filteredCoins.length === 0 ? (
            <p>No se encontraron criptomonedas que coincidan con la búsqueda.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              {filteredCoins.map(coin => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};