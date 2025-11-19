import { Cocktail } from "../entities/Cocktail.js";
import type { CreateCocktailDTO, CocktailResponseDTO } from "../dtos/CocktailDTO.js";

export class CocktailMapper {
  
  static toEntity(dto: CreateCocktailDTO): Cocktail {
    const cocktail = new Cocktail();
    cocktail.name = dto.name;
    cocktail.description = dto.description;
    cocktail.imageUrl = dto.imageUrl;
    cocktail.ingredients = dto.ingredients;
    cocktail.instructions = dto.instructions;
    return cocktail;
  }

  static toDTO(entity: Cocktail): CocktailResponseDTO {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      imageUrl: entity.imageUrl,
      ingredients: entity.ingredients,
      instructions: entity.instructions,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null 
    };
  }
}