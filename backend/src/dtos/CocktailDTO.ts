// DTO de Entrada/ request
export interface CreateCocktailDTO {
    name: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    instructions: string;
  }
  
  // DTO de Entrada/update
  export interface UpdateCocktailDTO extends Partial<CreateCocktailDTO> {}
  
  // DTO de Salida/ response
  export interface CocktailResponseDTO {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    ingredients: string[];
    instructions: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }