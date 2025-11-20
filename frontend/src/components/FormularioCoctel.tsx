import { useState, useEffect } from 'react';
import type { CreateCocktailDTO, CocktailResponseDTO } from '@/types/cocktail';
import { Utensils, Check, X, Loader2, Image as ImageIcon, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { ConfirmModal } from './ConfirmModal'; // Importamos el modal

interface FormularioProps {
    initialData?: CocktailResponseDTO;
    onSubmit: (data: CreateCocktailDTO) => Promise<void>;
    isSubmitting: boolean;
    onCancel: () => void;
}

interface FormErrors {
    name?: string;
    description?: string;
    imageUrl?: string;
    instructions?: string;
    ingredients?: string;
}

export function FormularioCoctel({ initialData, onSubmit, isSubmitting, onCancel }: FormularioProps) {
    const isEditing = !!initialData;
    
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [dataToSubmit, setDataToSubmit] = useState<CreateCocktailDTO | null>(null);

    const [formData, setFormData] = useState<CreateCocktailDTO>({
        name: initialData?.name || '',
        description: initialData?.description || '',
        imageUrl: initialData?.imageUrl || '',
        ingredients: initialData?.ingredients && initialData.ingredients.length > 0 ? initialData.ingredients : [''], 
        instructions: initialData?.instructions || '',
    });
    
    const [errors, setErrors] = useState<FormErrors>({}); 
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                description: initialData.description,
                imageUrl: initialData.imageUrl,
                ingredients: initialData.ingredients || [''],
                instructions: initialData.instructions,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
        if (name === 'imageUrl') setImageError(false);
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value;
        setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    };

    const addIngredient = () => {
        setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
    };

    const removeIngredient = (index: number) => {
        setFormData(prev => ({ ...prev, ingredients: prev.ingredients.filter((_, i) => i !== index) }));
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Obligatorio';
        if (!formData.description.trim()) newErrors.description = 'Obligatorio';
        if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Obligatorio';
        if (!formData.instructions.trim()) newErrors.instructions = 'Obligatorio';
        const cleanedIngredients = formData.ingredients.filter(ing => ing.trim() !== '');
        if (cleanedIngredients.length === 0) newErrors.ingredients = 'Agregue un ingrediente'; 
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitClick = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {

            const data: CreateCocktailDTO = {
                ...formData,
                ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
            };
            setDataToSubmit(data);
            setIsConfirmOpen(true);
        } else {
            toast.error('Por favor, complete todos los campos obligatorios.', { 
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });
        }
    };

    const handleConfirmSubmit = async () => {
        if (dataToSubmit) {
            await onSubmit(dataToSubmit);
            setIsConfirmOpen(false);
        }
    };

    return (
        <>
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmSubmit}
                title={isEditing ? "Guardar Cambios" : "Crear Nuevo Cóctel"}
                message={
                    <span>
                        ¿Estás seguro de que deseas {isEditing ? 'actualizar' : 'crear'} el cóctel <b>{formData.name}</b>?
                    </span>
                }
                variant="primary"
                confirmText={isEditing ? "Guardar" : "Crear"}
                cancelText="Revisar"
                isLoading={isSubmitting}
            />

            <form onSubmit={handleSubmitClick} className="space-y-6">
            
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    <div className="flex flex-col gap-6 h-full">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Nombre del Cóctel *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej: Mojito Cubano"
                                className={`w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                disabled={isSubmitting}
                            />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">URL de la Imagen *</label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                                className={`w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`}
                                disabled={isSubmitting}
                            />
                            {errors.imageUrl && <p className="text-xs text-red-500 mt-1">{errors.imageUrl}</p>}
                        </div>

                        <div className="flex-grow flex flex-col">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Descripción Corta *</label>
                            <textarea
                                name="description"
                                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-500 resize-none h-32 md:h-full ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Una breve descripción..."
                                disabled={isSubmitting}
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="block text-sm font-bold text-gray-700 mb-1">Vista Previa</span>
                        <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center shadow-sm">
                            {formData.imageUrl && !imageError ? (
                                <img
                                    src={formData.imageUrl}
                                    alt="Vista previa"
                                    className="w-full h-full object-contain p-2" 
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400 p-6 text-center">
                                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                                    <span className="text-xs font-medium">
                                        {imageError ? 'URL inválida' : 'Vista previa'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100 my-2" /> 

                {/* FILA 3: INGREDIENTES */}
                <div className="bg-violet-50/50 p-4 rounded-2xl border border-violet-100">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-base font-bold text-gray-800 flex items-center">
                            <Utensils className="w-4 h-4 mr-2 text-violet-600" /> Ingredientes
                        </h3>
                        <button
                            type="button"
                            onClick={addIngredient}
                            className="px-3 py-1 text-xs font-bold rounded-lg bg-violet-100 text-violet-700 hover:bg-violet-200 transition-colors"
                            disabled={isSubmitting}
                        >
                            + Agregar
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {formData.ingredients.map((ingrediente, index) => (
                            <div key={index} className="flex gap-2 items-center animate-fadeIn">
                                <span className="text-violet-400 font-bold text-xs w-4 text-center">{index + 1}.</span>
                                <input
                                    type="text"
                                    value={ingrediente}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    placeholder={`Ingrediente ${index + 1}`}
                                    className="flex-grow p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 shadow-sm text-base"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    disabled={isSubmitting || formData.ingredients.length === 1}
                                    aria-label="Eliminar ingrediente"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {errors.ingredients && <p className="mt-2 text-xs text-red-500 font-medium">{errors.ingredients}</p>}
                </div>

                {/* FILA 4: INSTRUCCIONES */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-bold text-gray-700">Instrucciones *</label>
                        <span className="text-xs text-violet-500 font-medium bg-violet-50 px-2 py-1 rounded-md border border-violet-100">
                            Usa <strong>Enter</strong> para separar pasos
                        </span>
                    </div>
                    
                    <textarea
                        name="instructions"
                        rows={5}
                        value={formData.instructions}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 ${errors.instructions ? 'border-red-500' : 'border-gray-300'}`}
                        disabled={isSubmitting}
                    />
                    {errors.instructions && <p className="mt-1 text-xs text-red-500">{errors.instructions}</p>}
                </div>

                {/* BOTONES */}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-bold rounded-xl text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 text-sm font-bold rounded-xl text-white bg-violet-600 hover:bg-violet-700 transition-all shadow-md flex items-center justify-center disabled:opacity-70"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? <> Guardar Cambios</> : <> Crear</>)}
                    </button>
                </div>
            </form>
        </>
    );
}