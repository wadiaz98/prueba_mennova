import { AppDataSource } from "../data-source.js";
import { Cocktail } from "../entities/Cocktail.js";

export const CocktailRepository = AppDataSource.getRepository(Cocktail).extend({});