import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/Users";
const service = require('../../services.js');
const bcrypt = require("bcryptjs");



@EntityRepository(User)
export class UserRepository extends Repository {


    // Modificación de datos de usuario
        async updateUser(userId, userInfo) {
            try {
            // Si lo que modifica es la password, la hashea
            if (userInfo.password) {
                userInfo.password = await bcrypt.hash(userInfo.password,2);} 
            await this.update(userId, userInfo);
            const user = await this.find({ where: {id: userId}, select: ["firstName", "lastName", "userName", "email"], relations: ["rol"] });
            return user;
            }
             catch (error) {
                throw error;
            }
        }

    async getUserInfo(idNum) {
        try {
            const find = this.find({ where: {id: idNum}, select: ["firstName", "lastName", "userName", "email"], relations: ["rol"] });
            return find;
        }
        catch (error) {
            return error;
        }
    }
}
