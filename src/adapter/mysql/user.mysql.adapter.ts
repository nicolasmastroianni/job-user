import { Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "../../application/port/out/user.repository";
import { User } from "../../application/model/user";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { Token } from "src/application/model/token";

//TODO : implementar sql reader para delegar codigo sql al archivo .sql correspondiente
//TODO : mapper de resultado de la query
@Injectable()
export class UserMySqlAdapter implements UserRepository {

  private readonly logger = new Logger(UserMySqlAdapter.name);

  @InjectDataSource()
  private readonly connection: Connection;

  async findByBillerId(billerId: string | null): Promise<User[]> {
    this.logger.debug(`Buscando usuarios con Id Facturador : ${billerId}`);

    //analizar usar un left join
    let query: string = `SELECT account.id         as id,
                                account.name       as name,
                                account.surname    as lastName,
                                fact.id_facturador as billerId
                         FROM dec_onboarding.account AS account
                                  JOIN dec_onboarding.facturacion AS fact ON account.cuit = fact.cuit `;
    query += this.generateFilter(billerId);

    this.logger.debug(`La query a ejecutar es ${query}`);
    let usersResult = await this.connection.query(query);

    let users: User[] = usersResult
      .map(({id, name, lastName, billerId }) => new User(id, name, lastName, billerId));
    this.logger.debug(`Usuarios obtenidos de bd : ${users}`);

    return users;
  }

  //TODO : mejorar esta parte usando mapa para valores
  private generateFilter(billerId: string | null) {
    return billerId ? `WHERE fact.id_facturador = '${billerId}'` : `WHERE fact.id_facturador is null`;
  }

  async create(token: Token, user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async update(user: User): Promise<User|any> {
    this.logger.debug(`Actualizando usuario con id : ${user.id} con el Id Facturador : ${user.billerId}`);

    let statement: string = `update dec_onboarding.account acc
                             inner join dec_onboarding.facturacion fac
                         on acc.cuit = fac.cuit
                             set fac.id_facturador = ${user.billerId}
                         where acc.id = ${user.id} `;

    this.logger.debug(`La sentencia a ejecutar es ${statement}`);
    await this.connection.query(statement)
      .then((r) => {
        this.logger.debug(`Usuario actualizado con exito`);
        return user;
      })
      .catch((error) =>{
        this.logger.error(`Ocurrio un error al querer actualizar el usuario con id : ${user.id}`);
        throw new Error();
      });
  }

}