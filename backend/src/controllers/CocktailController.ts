import type { Request, Response } from "express";
import { CocktailService } from "../services/CocktailService.js";
import type { CreateCocktailDTO, UpdateCocktailDTO } from "../dtos/CocktailDTO.js";
import { CocktailMapper } from "../mappers/CocktailMapper.js"; 

const service = new CocktailService();

export const getCocktails = async (req: Request, res: Response) => {
    const search = req.query.search as string;
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { data, total, totalPages } = await service.getAll(search, page, limit);
    
    const dtos = data.map(cocktail => CocktailMapper.toDTO(cocktail));
    
    res.status(200).json({
      status: "success",
      results: dtos.length,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: page,
        itemsPerPage: limit
      },
      data: dtos,
    });
};
  
export const getCocktailById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const cocktail = await service.getOne(id);
    res.status(200).json({ status: "success", data: CocktailMapper.toDTO(cocktail) });
};
  
export const createCocktail = async (req: Request, res: Response) => {
    const cocktailData: CreateCocktailDTO = req.body;
    const newCocktail = await service.create(cocktailData);
    res.status(201).json({ status: "success", data: CocktailMapper.toDTO(newCocktail) });
};
  
export const updateCocktail = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const cocktailData: UpdateCocktailDTO = req.body;
    const updatedCocktail = await service.update(id, cocktailData);
    res.status(200).json({ status: "success", data: CocktailMapper.toDTO(updatedCocktail) });
};

export const deleteCocktail = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await service.delete(id);
  res.status(204).send();
};

export const getDeletedCocktails = async (req: Request, res: Response) => {
  const cocktails = await service.getDeleted();
  const dtos = cocktails.map(cocktail => CocktailMapper.toDTO(cocktail));
  
  res.status(200).json({
    status: "success",
    results: dtos.length,
    data: dtos,
  });
};

export const restoreCocktail = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await service.restore(id);

  res.status(200).json({
    status: "success",
    message: "Cóctel restaurado correctamente"
  });
};