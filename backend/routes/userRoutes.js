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
router.get("/listUser", userController.listUser)

export default router;
