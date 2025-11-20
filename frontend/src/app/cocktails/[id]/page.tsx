'use client'; 

import { cocktailApi } from '@/api/cocktailApi';
import { ChevronLeft, Loader2, Frown, Utensils, Heart, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { CocktailResponseDTO } from '@/types/cocktail';
import { ConfirmModal } from '@/components/ConfirmModal'; // <--- IMPORTAR MODAL

interface DetailPageProps {
    params: {
        id: string;
    };
}

export default function CocktailDetailPage({ params }: DetailPageProps) {
    const { id } = params;
    const { isFavorite, toggleFavorite } = useFavorites();
    const router = useRouter();
    const [cocktail, setCocktail] = useState<CocktailResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState<string>('');

    useEffect(() => {
        const fetchCocktail = async () => {
            setLoading(true);
            try {
                const response = await cocktailApi.getById(id);
                const cocktailData = (response.data as any).data || response.data;
                setCocktail(cocktailData);
                setImgSrc(cocktailData.imageUrl || 'https://placehold.co/600x600/8b5cf6/ffffff?text=Cocktail+App');
            } catch (e: any) {
                setError('No se pudo encontrar el cóctel.');
            } finally {
                setLoading(false);
            }
        };
        fetchCocktail();
    }, [id]);

    const handleImageError = () => {
        setImgSrc('https://placehold.co/600x600/8b5cf6/ffffff?text=Cocktail+App');
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        try {
            await cocktailApi.delete(id);

            toast.success(
                <span>
                <b>{cocktail?.name}</b> ha sido enviado a la papelera
                </span>, {
                duration: 4000,
                position: 'bottom-center',
                icon: '🗑️',
            });
            setIsModalOpen(false); 
            router.push('/cocktails'); 
        } catch (e) {
            toast.error('Error al eliminar el cóctel.');
            setIsDeleting(false);
        }
    };

    if (loading) return <div className="flex justify-center h-screen items-center"><Loader2 className="w-10 h-10 text-violet-500 animate-spin"/></div>;
    if (error || !cocktail){
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center h-screen">
               <Frown className="w-16 h-16 text-gray-300 mb-4" />
               <h2 className="text-2xl font-semibold text-gray-700">Cóctel no disponible</h2>
               <Link href="/cocktails" className="mt-6 px-6 py-2 bg-violet-100 text-violet-700 rounded-full hover:bg-violet-200 transition-colors font-medium flex items-center">
                   <ChevronLeft className="w-4 h-4 mr-2" /> Volver al listado
               </Link>
           </div>
       );
    }
        

    const imageUrl = cocktail.imageUrl || 'https://placehold.co/600x400?text=No+Image';

    return (
        <>
            <Toaster position="bottom-center" />
            
            {/* INTEGRACIÓN DEL MODAL */}
            <ConfirmModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="¿Eliminar Cóctel?"
                message={<span>¿Estás seguro de que deseas enviar <b>{cocktail.name}</b> a la papelera?</span>}
                variant="danger"
                confirmText="Sí, eliminar"
                isLoading={isDeleting}
            />

            <div className="container mx-auto p-4 sm:p-8 min-h-[90vh]">
                <Link href="/cocktails" className="inline-flex items-center text-violet-600 hover:text-violet-800 mb-6 font-medium">
                    <ChevronLeft className="w-5 h-5 mr-1" /> Volver al listado
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-6 lg:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={imgSrc}
                                alt={`Imagen de ${cocktail.name}`}
                                className="w-full h-full object-cover"
                                onError={() => setImgSrc('https://placehold.co/600x600/8b5cf6/ffffff?text=Cocktail+App')}
                            />
                            <button onClick={() => toggleFavorite(cocktail.id)} className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white shadow-xl">
                                <Heart className={`w-6 h-6 transition-all ${isFavorite(cocktail.id) ? 'text-pink-600 fill-pink-600' : 'text-gray-500'}`} />
                            </button>
                        </div>
                        
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{cocktail.name}</h1>
                            <p className="text-xl text-violet-600 font-semibold mb-6">La Receta Perfecta</p>
                            
                            <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2 flex items-center"><Utensils className="w-6 h-6 mr-2 text-violet-500" /> Descripción</h3>
                            <p className="text-gray-700 mb-8">{cocktail.description}</p>

                            <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">Ingredientes</h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
                                {cocktail.ingredients?.map((ing, i) => <li key={i}>{ing}</li>) || <li>Sin ingredientes.</li>}
                            </ul>

                            <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">Instrucciones</h3>
                            <p className="text-gray-700 whitespace-pre-line">{cocktail.instructions}</p>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="flex space-x-4">
                            <Link href={`/cocktails/edit/${cocktail.id}`} className="flex items-center justify-center min-w-[160px] px-4 py-2 text-sm font-semibold rounded-lg bg-violet-500 text-white hover:bg-violet-600 shadow-md">
                                <Edit className="w-5 h-5 mr-2" /> Editar Cóctel
                            </Link>
                            <button 
                                onClick={() => setIsModalOpen(true)} 
                                className="flex items-center justify-center min-w-[160px] px-4 py-2 text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md"
                            >
                                <Trash2 className="w-5 h-5 mr-2" /> Eliminar
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">Creado el: {new Date(cocktail.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </>
    );
}