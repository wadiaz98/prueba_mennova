import { useState, useEffect, useCallback } from 'react';
import { cocktailApi } from '../api/cocktailApi';
import type { CocktailResponseDTO } from '../types/cocktail';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useDeletedCocktails() {
  const [deletedCocktails, setDeletedCocktails] = useState<CocktailResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDeleted = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cocktailApi.getDeleted();
      setDeletedCocktails(response.data.data);
    } catch (err) {
      console.error('Error al cargar eliminados:', err);
      setError('Error al cargar los elementos eliminados.');
    } finally {
      setLoading(false);
    }
  }, []);

  const restoreCocktail = async (id: string, name: string) => {
    
    try {
      await cocktailApi.restore(id);
      
      toast.success('Cóctel restaurado exitosamente.', { 
          duration: 3000,
          icon: '♻️',
          style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      
      fetchDeleted(); 
      router.refresh(); 
    } catch (e) {
      toast.error('Error al restaurar el cóctel.', { duration: 3000 });
    }
  };

  useEffect(() => {
    fetchDeleted();
  }, [fetchDeleted]);

  return {
    deletedCocktails,
    loading,
    error,
    restoreCocktail,
    fetchDeleted,
  };
}