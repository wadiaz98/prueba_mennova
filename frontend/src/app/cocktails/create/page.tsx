'use client';
import { FormularioCoctel } from '@/components/FormularioCoctel';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cocktailApi } from '@/api/cocktailApi';
import type { CreateCocktailDTO } from '@/types/cocktail';
import toast, { Toaster } from 'react-hot-toast';

export default function CreateCocktailPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreate = async (data: CreateCocktailDTO) => {
        setIsSubmitting(true);
        try {
            const response = await cocktailApi.create(data);
            const newCocktail = (response.data as any).data || response.data;
            toast.success(
                <span>Coctél <b>{newCocktail.name}</b> creado exitósamente
                </span>, 
                { 
                duration: 3000, 
                position:'bottom-center',
            });
            router.push(`/cocktails/${newCocktail.id}`); 
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Error desconocido al crear el cóctel.';
            toast.error(`Error: ${errorMessage}`, { duration: 4000 });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push('/cocktails');
    };

    return (
        <>
            <Toaster position="bottom-center" />
            <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-50/50">
                <div className="max-w-4xl mx-auto">
                    {/* Botón Volver */}
                    <Link href="/cocktails" className="inline-flex items-center text-violet-600 hover:text-violet-800 transition-colors mb-6 font-medium">
                        <ChevronLeft className="w-5 h-5 mr-1" /> Volver al listado
                    </Link>
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-violet-50 px-8 py-6 border-b border-violet-100">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 flex 
                            items-center">
                                🍸 Nuevo Cóctel
                            </h1>   
                        </div>
                        <div className='p-8'>
                            <FormularioCoctel 
                                onSubmit={handleCreate}
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