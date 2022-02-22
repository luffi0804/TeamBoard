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
//  sirve como filtro expresion regular es para garegar lo que queremos buscar en nuestro caso nombres

const listUserAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  // if (users.length === 0)
  //   return res.status(400).send({ message: "No search result" });

  // return res.status(200).send({ users });

  return users.length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ users });
};

// lista los usuarios que estan activos
const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(400).send({ message: "No search result" })
    : res.status(200).send({ users });
};

// Login usuario --- compare sirve para compara junto con el bcrypt
// generateJWT no siempre los genera, esto genera los token--- no se utiliza para los token
// req.body.password es lo que ingresa el usuario y user.login es loq eu va y compara en la base de datos
const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "Wrong email or password" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passHash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin._id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Login error" });
  }
};

// esta funcion elimina el usuario con el findByIdAndDelete el busca el id y lo elimina, no sirve este metodo para usuario porque en la base de datos siempre debe quedar registro de ese usuario, esto aplica para rol, tareas entre otras per no para usuarios--- findByIdUpdate busca el id y lo actualiza, lo que se debe hacer es poner el dbStatus en false, que lo que ahce es desactivar el usuario
const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !users
    ? res.status(400).send({ message: "Error deleteting user" })
    : res.status(200).send({ message: "User deleted" });
};

// por estandar primero se hace la negacion en la validacion, con el finduser el busca el email y luego si llega contraseña el lo cambia y utiliza el usamos el bcrypt para encryptar la contraseña nueva, si no llea nada la deja con el anterior-- en estemetodo se evidencia la diferencia de las variables const que no se va a editar y el let va a cambiar con el tiempo
const updateUserAdmin = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";

  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;
  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }
  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    password: pass,
    role: req.body.role,
  });

  if (!editUser) return res.status(500).send({ message: "Error editing user" });
  return res.status(200).send({message: "User updated" });
};

export default {
  registerUser,
  listUserAdmin,
  listUser,
  login,
  deleteUser,
  updateUserAdmin,
};
