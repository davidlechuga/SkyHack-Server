import mongoose from 'mongoose';
import { Usuarios } from './db';


//resolver 

export const resolvers = {
    Query: {

        getUsuarios: (root, {limite}) => {
            return Usuarios.find({}).limit(limite)
        },

        getUsuario: (root, { id }) => {
            return new Promise((resolve, rejects) => {
                Usuarios.findById(id, (error, usuario) => {
                    if (error) rejects(error)
                    else resolve(usuario)
                });
            });
        },
    },
    Mutation: {

        crearUsuario: (root,{ input }) => {

            const nuevoUsuario = new Usuarios({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                edad: input.edad,
                emails: input.emails,
                tipo: input.tipo
            })
            nuevoUsuario.id = nuevoUsuario._id;

            return new Promise((resolve, rejects) => {
                nuevoUsuario.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoUsuario)
                });
            });
        },

        modificarUsuario: (root, { input }) => {
            return new Promise((resolve, rejects) => {
                Usuarios.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, usuario) => {
                    if (error) rejects(error)
                    else resolve(usuario)
                });
            });
        },

        eliminarUsuario: (root, { id }) => {
            return new Promise((resolve, rejects) => {
                Usuarios.findOneAndRemove({ _id: id }, (error) => {
                    if (error) rejects(error)
                    else resolve("El Usuario Se Eliminó Correctamente")
                });
            });
        }
    }
};

