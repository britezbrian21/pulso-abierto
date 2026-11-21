// src/__tests__/favoriteStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoriteStore } from '../store/useFavoriteStore';

describe('Store de Favoritos (Zustand)', () => {
  
  beforeEach(() => {
    useFavoriteStore.setState({ favorites: [] });
  });

  it('debería iniciar con una lista de favoritos vacía', () => {
    const favorites = useFavoriteStore.getState().favorites;
    expect(favorites).toEqual([]);
  });

  it('debería agregar una criptomoneda a favoritos', () => {
    const { toggleFavorite } = useFavoriteStore.getState();
    
    
    toggleFavorite('bitcoin');

    const favorites = useFavoriteStore.getState().favorites;
    expect(favorites).toContain('bitcoin');
    expect(useFavoriteStore.getState().isFavorite('bitcoin')).toBe(true);
  });

  it('debería quitar una criptomoneda si ya estaba en favoritos', () => {
    const { toggleFavorite } = useFavoriteStore.getState();
    
    // Agregamos y luego quitamos
    toggleFavorite('ethereum');
    toggleFavorite('ethereum');

    const favorites = useFavoriteStore.getState().favorites;
    expect(favorites).not.toContain('ethereum');
    expect(useFavoriteStore.getState().isFavorite('ethereum')).toBe(false);
  });
});