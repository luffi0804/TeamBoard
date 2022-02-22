// importamos el modelo role
import role from "../models/role.js";

// Registraremos un rol req= request, lo que pide -- res= response, lo que responde
// ! negacion lo que quiere deir es que si no llego ninguna de los silicitado el termina la operacion
// 400 mensaje de error
// optimizacion de codigo if (!req.body.name || !req.body.description)
//  para traer lo del esquema esta instanciando o sea es como una copia  basada en el esquema de manera igual
// result guarda el json que mongo le devuelve pero depende si lo hizo bien o mal
const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Incomplete data" });

  let roleSchema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  let result = await roleSchema.save();
  if (!result)
    return res.status(500).send({ message: "failed to register role" });

  res.status(200).send({ result });
};

const listRole = async (req, res) => {
  let roles = await role.find()
  if (roles.length === 0)
    return res.status(400).send({ message: "No search result" });

  return res.status(200).send({ roles});
};

// exportamos las funcion para que cualquier modulo pueda utlizarlo
export default { registerRole, listRole };
