import { Router } from "express";
import { 
  getCocktails, 
  getCocktailById, 
  createCocktail, 
  updateCocktail,
  deleteCocktail,
  getDeletedCocktails, 
  restoreCocktail
} from "../controllers/CocktailController.js";

const router = Router();

router.get("/deleted", getDeletedCocktails);
router.patch("/:id/restore", restoreCocktail);


router.route("/")
  .get(getCocktails)
  .post(createCocktail);


router.route("/:id")
  .get(getCocktailById)
  .put(updateCocktail)
  .delete(deleteCocktail);

export default router;