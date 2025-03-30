import mongoose from "mongoose";
import ENVIROEMNT from "./enviroment.config.js";

const connectToMongoDB = async () => {
    try {
        const response = await mongoose.connect(ENVIROEMNT.MONGO_DB_URL)
        console.log('Conexion a la base de datos exitosa', mongoose.connection.name);
    } catch (error) {
        console.log('Error al conectar a la base de datos', error);

    }
}

connectToMongoDB()
export default mongoose
