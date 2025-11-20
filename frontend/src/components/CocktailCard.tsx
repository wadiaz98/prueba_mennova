'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Edit } from 'lucide-react';
import type { CocktailResponseDTO } from '../types/cocktail';
import { useState } from 'react';

interface CocktailCardProps {
  cocktail: CocktailResponseDTO;
  isFavorite: boolean; 
  onToggleFavorite: (id: string) => void;
}

export function CocktailCard({ cocktail, isFavorite, onToggleFavorite }: CocktailCardProps) {
  const [imgError, setImgError] = useState(false);
  
  const defaultImage = 'https://placehold.co/400x300/8B5CF6/FFFFFF?text=Cocktail';
  const imageUrl = imgError ? defaultImage : (cocktail.imageUrl || defaultImage);
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">
      
      {/* Contenedor de la Imagen y Favorito - AGREGADO relative */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-violet-100 to-purple-100">
        {/* Enlace al detalle */}
        <Link href={`/cocktails/${cocktail.id}`} className="absolute inset-0 z-0" aria-label={`Ver detalles de ${cocktail.name}`}>
          <Image
            src={imageUrl}
            alt={`Imagen de ${cocktail.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500"
            quality={75}
            onError={() => setImgError(true)}
            unoptimized
          />
        </Link>
        
        {/* Botones Flotantes */}
        <div className="absolute top-2 right-2 flex space-x-2 z-10">
            {/* Botón Editar */}
            <Link 
              href={`/cocktails/edit/${cocktail.id}`}
              className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-md"
              aria-label="Editar cóctel"
            >
              <Edit className="w-5 h-5 text-violet-600" />
            </Link>

            {/* Botón de Favorito */}
            <button 
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite(cocktail.id);
                }}
                className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-md"
                aria-label="Toggle favorite"
            >
                <Heart 
                  className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'text-pink-500 fill-pink-500' : 'text-gray-500 hover:text-pink-500'}`}
                />
            </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 truncate mb-1">
          {cocktail.name}
        </h2>
        
        <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
          {cocktail.description}
        </p>

        {/* Botón Ver Receta */}
        <Link href={`/cocktails/${cocktail.id}`} className="mt-4 w-full text-center py-2 text-sm font-semibold rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-md">
            Ver Receta
        </Link>
      </div>
    </div>
  );
}