import mongoose from "mongoose";

// vamos a guardar un esquema json  dentro de la variable roleSchema
// con { type: Date, default: Date.now} lo que hace es que toma la fecha actual y me lo guardar, lo hace por defecto el sistema
// dbStatus: Boolean lo que hace es desactivar un dato
const roleSchema = new mongoose.Schema({
  name: String,
  description: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

// lo que quiere decir la coleccion roles esta mongo y le voy a guadar ese esquema hecho anterior -- guardamos el esquema en mongo (roles)
const role = mongoose.model("roles", roleSchema);

// permite que otros modulos puedan hacer uso de el
export default role;