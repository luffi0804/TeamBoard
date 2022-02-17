import mongoose from "mongoose";

// para relacionar el usuario con el rol se usa {type:Schema.ObjectId, ref: "roles" }
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: mongoose.Schema.ObjectId, ref: "roles" },
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

const user = mongoose.model("users", userSchema);
export default user;
