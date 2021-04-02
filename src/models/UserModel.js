import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/Users";
const service = require('../../services.js');
const bcrypt = require("bcryptjs");



@EntityRepository(User)
export class UserRepository extends Repository {

    // Registro de usuario con los datos del JSON
    async createUser(userInfo) {
        try {
        // Crea el usuario
        const user = new User();
        console.log(userInfo);
        userInfo.password = await bcrypt.hash(userInfo.password,2);
        console.log(userInfo);
        return await this.save(userInfo)}
        catch (error) {
        throw error;
        }
    }

    // Modificación de datos de usuario
        async updateUser(userId, userInfo) {
            try {
            // Si lo que modifica es la password, la hashea
            if (userInfo.password) {
                userInfo.password = await bcrypt.hash(userInfo.password,2);} 
            await this.update(userId, userInfo);
            const user = await this.findOne({id: userId});
            return user;
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
            const passwordValida = await bcrypt.compare(password,find[0].password);
            if (find === 'undefined' || find.length <= 0) {
                return "Usuario no existe";
            } // Revisa si la contraseña es la guardada
            else if (!passwordValida) {
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
