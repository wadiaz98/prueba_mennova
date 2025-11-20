import Link from 'next/link';
import { Heart, Trash2, List } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo y link a la página principal */}
            <Link href="/" className="flex-shrink-0 flex items-center text-2xl font-extrabold text-violet-700 tracking-wide hover:text-violet-900 transition-colors">
              COCKTAIL APP 🍸
            </Link>
          </div>
          
          {/* Opciones de Navegación */}
          <div className="flex items-center space-x-6">
            
            {/* 1. Listado Principal */}
            <Link href="/cocktails" className="text-gray-600 hover:text-violet-600 transition duration-150 flex items-center space-x-1 font-medium text-sm sm:text-base">
                <List className="w-5 h-5 hidden sm:inline" />
                <span>Listado</span>
            </Link>
            
            {/* 2. Favoritos */}
            <Link href="/favorites" className="text-gray-600 hover:text-pink-600 transition duration-150 flex items-center space-x-1 font-medium text-sm sm:text-base">
                <Heart className="w-5 h-5 fill-current text-pink-500" />
                <span>Favoritos</span>
            </Link>
            
            {/* 3. Papelera de Eliminados */}
            <Link href="/cocktails/deleted" className="text-gray-600 hover:text-red-600 transition duration-150 flex items-center space-x-1 font-medium text-sm sm:text-base">
                <Trash2 className="w-5 h-5 text-gray-400" />
                <span className="hidden sm:inline">Papelera</span>
            </Link>

            {/* 4. Botón Añadir Cóctel */}
            <Link href="/cocktails/create" className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-violet-600 hover:bg-violet-700 transition duration-150 shadow-lg transform hover:scale-105">
              + Nuevo Cóctel
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}