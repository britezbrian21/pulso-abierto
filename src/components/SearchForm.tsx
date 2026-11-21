
import React, { useState } from 'react';
import { z } from 'zod';


const searchSchema = z.object({
  queryText: z.string().trim().min(2, { message: 'El término de búsqueda debe tener al menos 2 caracteres.' }),
  selectedCoin: z.string().min(1, { message: 'Debes seleccionar una opción válida.' }),
});

interface SearchFormProps {
  onSearch: (query: string, coinFilter: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [queryText, setQueryText] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('all');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    const result = searchSchema.safeParse({ queryText, selectedCoin });

    if (!result.success) {
      
    if (!result.success) {
      setErrorMsg(result.error.issues[0].message);
      return;
    }
    }

    setErrorMsg(null);
    onSearch(queryText, selectedCoin);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }} aria-label="Formulario de búsqueda">
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="queryText" style={{ display: 'block', fontWeight: 'bold' }}>Buscar criptomoneda:</label>
        <input
          id="queryText"
          type="text"
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Ej: Bitcoin..."
          style={{ padding: '8px', width: '100%', maxWidth: '300px', marginRight: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="selectedCoin" style={{ display: 'block', fontWeight: 'bold' }}>Filtrar por opción:</label>
        <select
          id="selectedCoin"
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          style={{ padding: '8px', width: '100%', maxWidth: '316px' }}
        >
          <option value="all">Todas las opciones</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="solana">Solana</option>
        </select>
      </div>

      <button type="submit" style={{ padding: '10px 20px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Buscar / Filtrar
      </button>

      {/* Mensaje de error accesible (Punto 5) */}
      {errorMsg && (
        <p style={{ color: '#d9534f', fontWeight: 'bold', marginTop: '10px' }} role="alert">
          ⚠️ {errorMsg}
        </p>
      )}
    </form>
  );
};