'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { cocktailApi } from '@/api/cocktailApi';
import type { CocktailResponseDTO } from '@/types/cocktail';
import { CocktailCard } from '@/components/CocktailCard';
import { Loader2, Heart, Frown, ChevronLeft } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function FavoritesPage() {
    const { favorites, isFavorite, toggleFavorite } = useFavorites();
    
    const [favoriteCocktails, setFavoriteCocktails] = useState<CocktailResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFavoritesData = async () => {
            setLoading(true);
 
            if (favorites.length === 0) {
                setFavoriteCocktails([]);
                setLoading(false);
                return;
            }

            try {
                const promises = favorites.map(id => cocktailApi.getById(id));
                const responses = await Promise.all(promises);
                
                const cocktailsData = responses.map(res => (res.data as any).data || res.data);
                setFavoriteCocktails(cocktailsData);
            } catch (err) {
                console.error("Error cargando favoritos:", err);
                setError('Algunos cócteles favoritos ya no existen o hubo un error de conexión.');
            } finally {
                setLoading(false);
            }
        };

        fetchFavoritesData();
    }, [favorites]);

    return (
        <>
            <Toaster position="bottom-center" />
            
            <div className="container mx-auto p-4 sm:p-8 min-h-screen">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4 gap-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
                        <Heart className="w-8 h-8 mr-3 text-pink-500 fill-pink-500" /> Tus Favoritos
                    </h1>
                    <Link href="/cocktails" className="inline-flex items-center text-violet-600 hover:text-violet-800 transition-colors font-medium">
                        <ChevronLeft className="w-5 h-5 mr-1" /> Volver al listado
                    </Link>
                </div>

                {/* Cargando */}
                {loading && (
                    <div className="flex flex-col justify-center items-center h-64">
                        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
                        <span className="text-lg text-gray-500">Cargando tu colección...</span>
                    </div>
                )}

                {/* Estado Vacío */}
                {!loading && favoriteCocktails.length === 0 && (
                    <div className="text-center p-16 bg-white rounded-3xl shadow-sm border border-gray-100 mt-4 max-w-lg mx-auto">
                        <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Aún no tienes favoritos</h3>
                        <p className="text-gray-500 mb-8">
                            Explora el catálogo y dale al corazón en los cócteles que más te gusten para guardarlos aquí.
                        </p>
                        <Link 
                            href="/cocktails" 
                            className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-all shadow-md"
                        >
                            Ir al Catálogo
                        </Link>
                    </div>
                )}

                {/* Error - si alguno falló, mostramos los que se pudieron cargar o el error */}
                {error && favoriteCocktails.length === 0 && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center mb-6">
                        <Frown className="w-6 h-6 inline mr-2" />
                        {error}
                    </div>
                )}

                {/* Grid de Favoritos */}
                {!loading && favoriteCocktails.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 animate-fadeIn">
                        {favoriteCocktails.map((cocktail) => (
                            <CocktailCard
                                key={cocktail.id}
                                cocktail={cocktail}
                                isFavorite={true}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                )}

            </div>
        </>
    );
}