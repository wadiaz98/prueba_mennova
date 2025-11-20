import { useState, useEffect, useCallback } from 'react';
    import { cocktailApi } from '../api/cocktailApi';
    import type { CocktailResponseDTO, Pagination } from '../types/cocktail';

    const initialPagination: Pagination = {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      itemsPerPage: 10,
    };

    export function useCocktails() {
      const [cocktails, setCocktails] = useState<CocktailResponseDTO[]>([]);
      const [pagination, setPagination] = useState<Pagination>(initialPagination);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [search, setSearch] = useState('');
      const [currentPage, setCurrentPage] = useState(1);

      const fetchCocktails = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await cocktailApi.getAll(currentPage, search);
          

          setCocktails(response.data.data);
          setPagination(response.data.pagination);
        } catch (err) {
          console.error('Error al cargar cócteles:', err);
          setError('Error al cargar los cócteles. Verifique que el Backend esté corriendo.');
        } finally {
          setLoading(false);
        }
      }, [currentPage, search]);

      useEffect(() => {
        fetchCocktails();
      }, [fetchCocktails]);

      const handleSearch = (term: string) => {
        setSearch(term);
        setCurrentPage(1);
      };

      const handlePageChange = (page: number) => {
        if (page >= 1 && page <= pagination.totalPages) {
          setCurrentPage(page);
        }
      };

      return {
        cocktails,
        loading,
        error,
        search,
        pagination,
        handleSearch,
        handlePageChange,
        refetch: fetchCocktails,
      };
    }