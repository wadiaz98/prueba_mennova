import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] space-y-4">
      <Loader2 className="w-16 h-16 text-violet-600 animate-spin" />
      <p className="text-xl font-semibold text-gray-600 animate-pulse">
        Preparando la barra...
      </p>
    </div>
  );
}