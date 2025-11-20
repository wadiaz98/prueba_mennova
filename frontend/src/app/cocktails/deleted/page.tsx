'use client'; 

import { useState } from 'react';
import { useDeletedCocktails } from '@/hooks/useDeletedCocktails';
import { useFavorites } from '@/hooks/useFavorites';
import { Loader2, Trash2, RotateCcw, Frown, ChevronLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { ConfirmModal } from '@/components/ConfirmModal';

export default function DeletedCocktailPage() {
    const { deletedCocktails, loading, error, restoreCocktail } = useDeletedCocktails();
    const { isFavorite } = useFavorites();
 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cocktailToRestore, setCocktailToRestore] = useState<{id: string, name: string} | null>(null);
    const [isRestoring, setIsRestoring] = useState(false);

    const handleRestoreClick = (id: string, name: string) => {
        setCocktailToRestore({ id, name });
        setIsModalOpen(true);
    };

    const confirmRestore = async () => {
        if (!cocktailToRestore) return;

        setIsRestoring(true);
        await restoreCocktail(cocktailToRestore.id, cocktailToRestore.name);
        
        setIsRestoring(false);
        setIsModalOpen(false);
        setCocktailToRestore(null);
    };

    if (error) {
        return (
             <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-xl max-w-lg mx-auto mt-10 shadow-lg border border-red-200">
                <Frown className="w-12 h-12 text-red-500 mb-4" />
                <h2 className="text-2xl font-semibold text-red-700">Error de Carga</h2>
                <p className="text-gray-600 mt-2">No se pudo cargar la papelera.</p>
            </div>
        );
    }

    return (
        <>
            <Toaster position="bottom-center" />
            
            {/* MODAL DE CONFIRMACIÓN */}
            <ConfirmModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmRestore}
                title="¿Restaurar Cóctel?"
                message={
                    <span>
                        ¿Seguro que deseas restaurar el cóctel <b>{cocktailToRestore?.name}</b>?
                        <br/><br/>
                    </span>
                }
                variant="primary"
                confirmText="Restaurar"
                cancelText="Cancelar"
                isLoading={isRestoring}
            />

            <div className="container mx-auto p-4 sm:p-8 min-h-screen">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b pb-4 gap-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
                        <Trash2 className="w-8 h-8 mr-3 text-gray-500" /> Papelera de Reciclaje
                    </h1>
                    <Link href="/cocktails" className="inline-flex items-center text-violet-600 hover:text-violet-800 transition-colors font-medium">
                        <ChevronLeft className="w-5 h-5 mr-1" /> Volver al listado
                    </Link>
                </div>
                
                {loading && (
                    <div className="flex justify-center items-center h-48">
                        <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
                        <span className="ml-3 text-lg text-gray-600">Buscando eliminados...</span>
                    </div>
                )}

                {!loading && deletedCocktails.length === 0 && (
                    <div className="text-center p-16 bg-white rounded-3xl shadow-sm border border-gray-100 mt-4 max-w-lg mx-auto">
                        <RotateCcw className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Papelera Vacía</h3>
                        <p className="text-gray-500">
                            No hay cócteles eliminados. ¡Todo está en orden!
                        </p>
                    </div>
                )}

                {!loading && deletedCocktails.length > 0 && (
                    <div className="grid gap-4 animate-fadeIn">
                        {deletedCocktails.map((cocktail) => (
                            <div key={cocktail.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition-shadow">
                                
                                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                    <div className="p-3 bg-red-50 rounded-full">
                                        <Trash2 className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{cocktail.name}</h3>
                                        <p className="text-sm text-gray-500 flex items-center">
                                            Eliminado el: {cocktail.deletedAt ? new Date(cocktail.deletedAt).toLocaleDateString() : 'N/A'}
                                            {isFavorite(cocktail.id) && (
                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-pink-100 text-pink-800">
                                                    <Heart className="w-3 h-3 mr-1 fill-current" /> Favorito
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRestoreClick(cocktail.id, cocktail.name)}
                                    className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold rounded-xl text-white bg-green-600 hover:bg-green-700 transition-colors shadow-md flex items-center justify-center"
                                >
                                    <RotateCcw className="w-4 h-4 mr-2" /> Restaurar Cóctel
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}