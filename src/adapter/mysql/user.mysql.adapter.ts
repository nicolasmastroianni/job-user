import { Injectable, Logger } from "@nestjs/common";
import { UserRepository } from "../../application/port/out/user.repository";
import { User } from "../../application/model/user";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connection } from "typeorm";

//TODO : implementar sql reader para delegar codigo sql al archivo .sql correspondiente
//TODO : mapper de resultado de la query
@Injectable()
export class UserMySqlAdapter implements UserRepository {

  private readonly logger = new Logger(UserMySqlAdapter.name);

  @InjectDataSource()
  private readonly connection: Connection;

  async findByBillerId(billerId: string | null): Promise<User[]> {
    this.logger.debug(`Buscando usuarios con Id Facturador : ${billerId}`);

    let query: string = `SELECT account.name       as name,
                                account.surname    as lastName,
                                fact.id_facturador as billerId
                         FROM dec_onboarding.account AS account
                                  JOIN dec_onboarding.facturacion AS fact ON account.cuit = fact.cuit `
    query += this.generateFilter(billerId);

    this.logger.debug(`La query a ejecutar es ${query}`)
    let usersResult = await this.connection.query(query);

    let users: User[] = usersResult
      .map(({ name, lastName, billerId }) => new User(name, lastName, billerId));
    this.logger.debug(`Usuarios obtenidos de bd : ${users}`);

    return users;
  }

  //TODO : mejorar esta parte usando mapa para valores
  private generateFilter(billerId: string | null) {
    return billerId? `WHERE fact.id_facturador = '${billerId}'` : `WHERE fact.id_facturador is null`;
  }

}