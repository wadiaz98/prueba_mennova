import { useState, useEffect } from 'react';

    const STORAGE_KEY = 'cocktailFavorites';

    export function useFavorites() {
      const [favorites, setFavorites] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem(STORAGE_KEY);
          return saved ? JSON.parse(saved) : [];
        }
        return [];
      });

      useEffect(() => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        }
      }, [favorites]);

      const toggleFavorite = (id: string) => {
        setFavorites(prevFavorites => {
          if (prevFavorites.includes(id)) {
            return prevFavorites.filter(favId => favId !== id);
          } else {
            return [...prevFavorites, id];
          }
        });
      };

      const isFavorite = (id: string) => {
        return favorites.includes(id);
      };

      return {
        favorites,
        isFavorite,
        toggleFavorite,
      };
    }