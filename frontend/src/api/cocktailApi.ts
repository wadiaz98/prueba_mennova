import axios from 'axios';
import type { CocktailListResponse, CocktailResponseDTO, CreateCocktailDTO, UpdateCocktailDTO } from '../types/cocktail';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/cocktails';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  //withCredentials: true,
});

export const cocktailApi = {
  // GET /api/cocktails?page=...&search=...
  getAll: (page: number, search: string) => {
    return api.get<CocktailListResponse>('/', { 
      params: { 
        page, 
        limit: 10,
        search 
      } 
    });
  },

  // GET /api/cocktails/:id
  getById: (id: string) => {
    return api.get<CocktailResponseDTO>(`/${id}`);
  },

  // POST /api/cocktails
  create: (data: CreateCocktailDTO) => {
    return api.post<CocktailResponseDTO>('/', data);
  },

  // PUT /api/cocktails/:id
  update: (id: string, data: UpdateCocktailDTO) => {
    return api.put<CocktailResponseDTO>(`/${id}`, data);
  },

  // DELETE /api/cocktails/:id (Soft Delete)
  delete: (id: string) => {
    return api.delete<void>(`/${id}`);
  },
  
  // PATCH /api/cocktails/:id/restore
  restore: (id: string) => {
    return api.patch<void>(`/${id}/restore`);
  },

  // GET /api/cocktails/deleted
  getDeleted: () => {
    return api.get<CocktailListResponse>('/deleted');
  },
};