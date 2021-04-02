import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/Users";
const service = require('../../services.js');


@EntityRepository(User)
export class UserRepository extends Repository {

    // Registro de usuario con los datos del JSON
    async createUser(userInfo) {
        try {
        // Crea el usuario
        const user = new User();
        // Actualiza info con los datos de la request
        // user.userName = userInfo.username;
        // user.password = userInfo.password;
        // user.firstName = userInfo.nombre.toUpperCase();
        // user.lastName = userInfo.apellido.toUpperCase();
        // user.email = userInfo.email;
        // user.rol = userInfo.rol;
        return await this.save(userInfo)}
        catch (error) {
        throw error;
        }
    }

    // Modificación de datos de usuario
        async updateUser(userId, userInfo) {
            try {
            // Encuentra el usuario con el ID que viene en la request
            const user = await this.findOne({id: userId});
            // Revisa que exista
            if (user === undefined || user.length <=0) {
                // Si no existe, devuelve error
                return "El usuario no existe";
            }
             else {
                // Si existe, actualiza y devuelve nuevos datos
                user.firstName = userInfo.firstName;
                user.password = userInfo.password;
                user.lastName = userInfo.lastName;
                user.email = userInfo.email;
                user.rol = userInfo.rol;
                user.userName = userInfo.userName;
                await this.update(userId, user);
                const newUserInfo = await this.find({id: userId});
                return newUserInfo;
            }
            }
             catch (error) {
                throw error;
            }
        }

    //Login
    async login(username, password) {
        try {
            // Busqueda por nombre de usuario
            const find = await this.find({where: {userName: username}, relations: ["rol"]});
            if (find === 'undefined' || find.length <= 0) {
                return "Usuario no existe";
            } // Revisa si la contraseña es la guardada
            else if (find[0].password !== password) {
                return "Constraseña incorrecta";
            }
            else {
                const token = service.createToken(find[0].id, find[0].rol.rolId);
                return token;}
        }
        catch (error) {
            return error;
        }
    }
    async getUserInfo(idNum) {
        try {
             const find = await this.findOne({where: {id: idNum},relations: ["rol"]});
            return find;
        }
        catch (error) {
            return error;
        }
    }
}
