// invocamos a express para manejar las rutas
//  importamos el modulo para cuando se registre
import roleController from "../controllers/roleController.js";
import express from "express";
const router = express.Router();

// creando la api, se busca la ruta
router.post("/registerRole", roleController.registerRole);
router.get("/listRole", roleController.listRole)

export default router;
