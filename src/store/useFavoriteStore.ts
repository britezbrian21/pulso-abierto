// src/store/useFavoriteStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id: string) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((fav) => fav !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },
      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: 'crypto-favorites-storage', // Nombre para el localStorage
    }
  )
);