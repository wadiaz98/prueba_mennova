import { Cocktail } from "../entities/Cocktail.js";
import { AppError } from "../utils/AppError.js";
import { CocktailRepository } from "../repositories/CocktailRepository.js";
import type { CreateCocktailDTO, UpdateCocktailDTO } from "../dtos/CocktailDTO.js";
import { CocktailMapper } from "../mappers/CocktailMapper.js";
import { ILike, IsNull, Not } from "typeorm"; 

export class CocktailService {
  
  async getAll(search?: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit; // Calculamos cuántos saltar
    
    const whereCondition = search 
      ? { name: ILike(`%${search.trim()}%`) } 
      : {};

    const [result, total] = await CocktailRepository.findAndCount({
      where: whereCondition,
      order: { createdAt: "DESC" },
      take: limit,
      skip: skip 
    });

    return {
      data: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }
  
  async getDeleted() {
      return await CocktailRepository.find({
        withDeleted: true, 
        where: { deletedAt: Not(IsNull()) },
        order: { deletedAt: "DESC" }
      });
    }
  
  async getOne(id: string) {
    const cocktail = await CocktailRepository.findOneBy({ id });
    if (!cocktail) {
      throw new AppError("Cóctel no encontrado", 404);
    }
    return cocktail;
  }

  async create(data: CreateCocktailDTO): Promise<Cocktail> {
    const cleanName = data.name.trim();

    const existing = await CocktailRepository.findOne({ 
        where: { name: ILike(cleanName) } 
    });
    
    if (existing) {
      throw new AppError(`Ya existe un cóctel con el nombre '${existing.name}'`, 409);
    }

    data.name = cleanName;

    const newCocktailEntity = CocktailMapper.toEntity(data);
    return await CocktailRepository.save(newCocktailEntity);
  }

  async update(id: string, data: UpdateCocktailDTO): Promise<Cocktail> {
    const cocktail = await this.getOne(id);

    if (data.name) {
       const cleanName = data.name.trim();

       if (cleanName.toLowerCase() !== cocktail.name.toLowerCase()) {
           const existing = await CocktailRepository.findOne({ 
               where: { name: ILike(cleanName) } 
           });
           
           if (existing) {
             throw new AppError(`Ya existe otro cóctel con el nombre '${existing.name}'`, 409);
           }
           data.name = cleanName;
       }
    }

    CocktailRepository.merge(cocktail, data);
    return await CocktailRepository.save(cocktail);
  }

  async delete(id: string): Promise<void> {
      await this.getOne(id);
      await CocktailRepository.softDelete(id);
    }
  
    async restore(id: string): Promise<void> {
      const result = await CocktailRepository.restore(id);
      if (result.affected === 0) {
        throw new AppError("No se pudo restaurar (quizás no existía)", 404);
      }
    }
}