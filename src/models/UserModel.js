import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/Users";

@EntityRepository(User)
export class UserRepository extends Repository {

    // Registro de usuario con los datos del JSON
    async createUser(userInfo) {
        try {
        const user = new User();
        user.userName = userInfo.username;
        user.password = userInfo.password;
        user.firstName = userInfo.nombre.toUpperCase();
        user.lastName = userInfo.apellido.toUpperCase();
        user.email = userInfo.email;
        user.rol = userInfo.rol;
        return await this.save(user);}
        catch (error) {
            return error;
        }
    }

}
