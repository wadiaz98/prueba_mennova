import { useMemo } from 'react';

interface PaginationProps {
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
    };
    onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
    const pages = useMemo(() => {
        const p = [];
        for (let i = 1; i <= pagination.totalPages; i++) {
            p.push(i);
        }
        return p;
    }, [pagination.totalPages]);

    if (pagination.totalPages <= 1) return null;

    return (
        <div className="flex justify-center flex-wrap gap-2 my-8">
            {/* Botón Anterior */}
            <button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md"
                aria-label="Anterior"
            >
                Anterior
            </button>
            
            {/* Números de Página */}
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-md ${
                        page === pagination.currentPage 
                            ? 'bg-violet-800 text-white ring-2 ring-violet-300'
                            : 'bg-white text-violet-600 hover:bg-violet-50 border border-violet-200'
                    }`}
                    aria-current={page === pagination.currentPage ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {/* Botón Siguiente */}
            <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md"
                aria-label="Siguiente"
            >
                Siguiente
            </button>
        </div>
    );
}