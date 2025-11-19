import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import app from "./app.js"; 
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => console.log("Error al conectar DB: ", error));