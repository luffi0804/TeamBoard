// importamos el usuario porque necesitamos que cuando se loguee le quede el role
// bcrypt para encriptar las contraseñas
// el jsonWebToken es para que cuando el usuario se loguee le de un token y poder encriptar y para saber si esta logueado o no en la app
import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

// findOne se encarga de buscar en la coleccion de usuario con el mismo email, no lo deje registarla primera coincidencia que encuentra--- estas validaciones se pueden hacer en middleware

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    role: req.body.role,
    dbStatus: true,
  });

  //   el paso que vamos a realizar es para tener la data fija para validar el usuario y que otro no lo vea
  // momento nos va a ayudar encryptar despues se puede agregar una palabra secreta para hacerla mas segura
  const result = await userSchema.save();
  if (!result) return res.status(500).send({ message: "Failed to register" });
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          role: result.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

// listar usuarios- find()trae todo, si quiero agreagr un filtro lo hago dentro del parentests-- el .length para saber si esta vacia
const listUser = async (req, res) => {
  let users = await user.find().populate("role").exec();
  if (users.length === 0)
    return res.status(400).send({ message: "No search result" });

  return res.status(200).send({ users });
};

export default { registerUser, listUser };
