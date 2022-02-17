// importamos mongoose de el modulo mongoose
import mongoose from "mongoose";

// ahora creamos una funcion db connection lo que conecta nodejs con  mongo
// connect se encarga de comunicar a nodeJS con  la base de datos
//  ()necesita dos parametros(por buenas practicas) la url de conexion para que le de permiso de utilizar la base de datos
// process se encarga de ir al archivo solo los que tiene. -- .env y saca la variable de el archivo que se le pida
// uneNewUrlParser: true -- lo que hace es utiliza una nueva url para darle otro nombre en consola   useUnifiedTopology: true -- tipo de escritura entendible para el programador en la consola -- son buenas practicas

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: OK");
  } catch (e) {
    console.log("Error connecting to MongoDB: \n ", e);
  }
};

// exportamos  la funcion

export default { dbConnection };
