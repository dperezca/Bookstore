import { Rol } from "../entities/Roles";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Rol)
export class RolRepository extends Repository {

    //Buscar descripción del Rol
    async getRolDesc(rolId) {
        try {
            const rolDesc = await this.find({rolId: rolId});
            return rolDesc;
        }
        catch (error) {
            return error;
        }
    }
}
