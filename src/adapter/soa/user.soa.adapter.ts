import { UserRepository } from "../../application/port/out/user.repository";
import { Injectable, Logger } from "@nestjs/common";
import { User } from "../../application/model/user";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connection } from "typeorm";

//TODO: implementacion sql momentanea por pruebas, hay que m
@Injectable()
export class UserSoaAdapter implements UserRepository {

  private readonly logger = new Logger(UserSoaAdapter.name);

  @InjectDataSource()
  private readonly connection: Connection;

  async findByBillerId(billerId: string | null): Promise<User[]> {

    this.logger.debug(`Buscando usuarios con Id Facturador ${billerId}`);

    let usersResult = await this.connection.query(
      `SELECT account.name as name,
              account.surname as lastName,
              account.cuit as cuit,
              account.email as email,
              fact.id_facturador as billerId
       FROM dec_onboarding.account AS account
                JOIN dec_onboarding.facturacion AS fact ON account.cuit = fact.cuit
      WHERE fact.id_facturador = '${billerId}'`
    );

    let users: User[] = usersResult
      .map(({ name, lastName, billerId }) => new User(name, lastName, billerId));
    this.logger.debug(`Usuarios obtenidos de bd ${users}`);

    return users;
  }

}