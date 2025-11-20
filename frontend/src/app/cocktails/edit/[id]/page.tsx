'use client';

import { FormularioCoctel } from '@/components/FormularioCoctel';
import { ChevronLeft, Loader2, Frown } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cocktailApi } from '@/api/cocktailApi';
import type { CreateCocktailDTO, CocktailResponseDTO } from '@/types/cocktail';
import toast, { Toaster } from 'react-hot-toast';

interface EditPageProps {
    params: {
        id: string;
    };
}

export default function EditCocktailPage({ params }: EditPageProps) {
    const { id } = params;
    const router = useRouter();
    const [cocktail, setCocktail] = useState<CocktailResponseDTO | null>(null);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await cocktailApi.getById(id);
                const cocktailData = (response.data as any).data || response.data;
                
                setCocktail(cocktailData);
            } catch (error) {
                console.error(error);
                setErrorData('No se pudo cargar el cóctel para edición.');
                toast.error('Error al cargar datos.', { duration: 3000 });
            } finally {
                setLoadingData(false);
            }
        };
        fetchDetail();
    }, [id]);

    const handleUpdate = async (data: CreateCocktailDTO) => {
        setIsSubmitting(true);
        try {
            await cocktailApi.update(id, data);
            toast.success(`¡Cambios guardados en "${data.name}"!`, { 
                duration: 3000,
                icon: '💾'
            });
            router.push(`/cocktails/${id}`); 
        } catch (error: any) {
             const errorMessage = error.response?.data?.message || 'Error desconocido al guardar los cambios.';
            toast.error(`Error: ${errorMessage}`, { duration: 4000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push(`/cocktails/${id}`);
    };

    // --- Vistas Condicionales ---

    if (loadingData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-12 h-12 text-violet-500 animate-spin" />
            </div>
        );
    }
    
    if (errorData || !cocktail) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center h-screen">
                <Frown className="w-16 h-16 text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700">Error de Carga</h2>
                <p className="text-gray-500 mt-2 mb-6">No pudimos recuperar la información del cóctel.</p>
                <Link href="/cocktails" className="px-6 py-2 bg-violet-100 text-violet-700 rounded-full hover:bg-violet-200 transition-colors font-medium flex items-center">
                    <ChevronLeft className="w-4 h-4 mr-2" /> Volver al listado
                </Link>
            </div>
        );
    }

    return (
        <>
            <Toaster position="bottom-center" />
            <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-50/50">
                <div className="max-w-4xl mx-auto">
                    <Link href={`/cocktails/${id}`} className="inline-flex items-center text-violet-600 hover:text-violet-800 transition-colors mb-6 font-medium group">
                        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Cancelar y volver
                    </Link>

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-violet-50 px-8 py-6 border-b border-violet-100">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex items-center">
                                ✏️ Editar Cóctel
                            </h1>
                            <p className="text-gray-500 mt-1">Modifica los detalles de tu receta</p>
                        </div>
                        
                        <div className="p-8">
                            <FormularioCoctel 
                                initialData={cocktail}
                                onSubmit={handleUpdate}
                                isSubmitting={isSubmitting}
                                onCancel={handleCancel}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}