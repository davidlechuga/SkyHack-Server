import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// Definir el Schema de Usuarios 
    
const usuariosSchema = new mongoose.Schema({
    nombre: String, 
    apellido: String,
    empresa: String,
    edad: Number,
    emails: Array,
    tipo: String
})

const Usuarios = mongoose.model('SkyHackUsers', usuariosSchema)

export { Usuarios };