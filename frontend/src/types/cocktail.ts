export interface CocktailResponseDTO {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    instructions: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }

  export interface CreateCocktailDTO {
    name: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    instructions: string;
  }

  export interface UpdateCocktailDTO extends Partial<CreateCocktailDTO> {}

  export interface Pagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  }

  export interface CocktailListResponse {
    status: 'success';
    results: number;
    pagination: Pagination;
    data: CocktailResponseDTO[];
  }