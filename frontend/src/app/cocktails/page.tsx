'use client';
import { useCocktails } from '@/hooks/useCocktails';
import { useFavorites } from '@/hooks/useFavorites';
import { CocktailCard } from '@/components/CocktailCard';
import { Pagination } from '@/components/Pagination';
import { Search, Loader2, Frown, Heart } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

export default function CocktailListPage() {
  const { cocktails, loading, error, search, pagination, handleSearch, handlePageChange, refetch } = useCocktails();
  const { isFavorite, toggleFavorite } = useFavorites();
 
  const [searchTerm, setSearchTerm] = useState(search);

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm.trim()); 
  };

  // --- RENDERING DE ERROR ---
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-xl max-w-lg mx-auto mt-10 shadow-lg border border-red-200">
        <Frown className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-700">Error de Conexión</h2>
        <p className="text-gray-600 mt-2">No se pudo conectar con el Backend.</p>
        <p className="text-sm text-gray-500 mt-1">Detalle: {error}</p>
        <button 
            onClick={() => refetch()}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
        >
            Intentar de Nuevo
        </button>
      </div>
    );
  }

  // --- VISTA PRINCIPAL ---
  return (
    <>
      <Toaster /> {/* Notificaciones */}
      
      <div className="container mx-auto p-4 sm:p-8 min-h-screen">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
           Catálogo de Cócteles
          </h1>
        </div>

        {/* Buscador */}
        <form onSubmit={handleSubmitSearch} className="mb-10 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre (ej: Mojito, Margarita...)"
              className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl leading-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-all duration-200 ease-in-out"
            />
            <button 
                type='submit' 
                className="absolute inset-y-2 right-2 px-4 bg-violet-100 text-violet-700 rounded-xl hover:bg-violet-200 font-medium transition-colors text-sm"
            >
                Buscar
            </button>
          </div>
        </form>
        
        {/* Estado de Carga */}
        {loading && (
          <div className="flex flex-col justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-violet-600 animate-spin mb-4" />
            <span className="text-lg text-gray-500 font-medium">Preparando los mejores cócteles...</span>
          </div>
        )}

        {/* Estado Vacío - Búsqueda sin resultados */}
        {!loading && cocktails.length === 0 && search.trim() !== '' && (
          <div className="text-center p-16 bg-white rounded-3xl shadow-sm border border-gray-100 mt-4 max-w-md mx-auto">
              <Frown className="w-12 h-12 text-violet-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No encontramos nada</h3>
              <p className="text-gray-500">
                <span>
                No hay resultados para <b>{search}</b>. Intenta con otro nombre.
                </span>
              </p>
              <button 
                onClick={() => { handleSearch(''); setSearchTerm(''); }}
                className="mt-6 text-violet-600 hover:text-violet-800 font-medium hover:underline"
              >
                Ver todos los cócteles
              </button>
          </div>
        )}

        {/* Estado Vacío - Base de datos vacía */}
        {!loading && cocktails.length === 0 && search.trim() === '' && (
            <div className="text-center p-16 bg-white rounded-3xl shadow-sm border border-gray-100 mt-4 max-w-md mx-auto">
                <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-10 h-10 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">¡Empieza la fiesta!</h3>
                <p className="text-gray-500 mb-8">Aún no hay cócteles en el catálogo. Sé el primero en agregar uno.</p>
                <Link 
                    href="/cocktails/create" 
                    className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-all shadow-md"
                >
                    Crear mi primer cóctel
                </Link>
            </div>
        )}

        {/* Lista de Resultados */}
        {!loading && cocktails.length > 0 && (
          <div className="animate-fadeIn">
            {/* Grid de Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {cocktails.map((cocktail) => (
                <CocktailCard
                  key={cocktail.id}
                  cocktail={cocktail}
                  isFavorite={isFavorite(cocktail.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            
            {/* Paginación */}
            {pagination.totalPages > 1 && (
                <div className="border-t border-gray-200 pt-8">
                    <Pagination 
                        pagination={pagination} 
                        onPageChange={handlePageChange} 
                    />
                    <p className="text-center text-sm text-gray-400 mt-4">
                        Página {pagination.currentPage} de {pagination.totalPages} • {pagination.totalItems} resultados
                    </p>
                </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}