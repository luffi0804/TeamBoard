// librerias solo para el servidor
// express servidor
import express from "express";

// reglas del servidor seguridad, protocolos

import cors from "cors";

// importamos la base de datos  por estandar la llamamos db

import db from "./db/db.js";

import roleRoutes from "./routes/roleRoutes.js";

// importamos el userRoutes

import userRoutes from "./routes/userRoutes.js";

//  Para importar las libreria de variables de entornos el config lo inicializa para poder utlizarla
// importamos routes task
import taskRoutes from "./routes/taskRoutes.js";

import dotenv from "dotenv";
dotenv.config();

// app es nuestro servidor, reglas del servidor va utilizar solo json y cors para reglas, luego va reservar el puerto con el s.o ------

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/role", roleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
// nos muestra en que puerto esta escuchando

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port: ", process.env.PORT)
);

db.dbConnection();
