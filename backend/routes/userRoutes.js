import userController from "../controllers/userController.js";
import express from "express";
import roleMidd from "../middleware/roleValidate.js";
//  segunda opcion
// import userValidate from "../middleware/userValidate.js";
import userMidd from "../middleware/userValidate.js";
const router = express.Router();

// segunda opcion
// const existingUser = userValidate.existingUser;
// creando la api, se busca la ruta
// segunda opcion
// router.post("/registerUser", existingUser, userController.registerUser);
router.post(
  "/registerUser",
  userMidd.existingUser,
  roleMidd.existingRole,
  userController.registerUser
);

// cuando se envian datos con json se utiliza un post
// le pongo parametros para que me traiga conicidencias o todo el dato
// get obtiene, post hace una petecion, delete elimina -- put edita
router.get("/listUser/:name?", userController.listUser);
router.get("/listUserAdmin/:name?", userController.listUser);
router.post("/login", userController.login);
router.put("/delete/:_id", userController.deleteUser);
router.put("/updateUserAdmin", userController.updateUserAdmin);



export default router;
