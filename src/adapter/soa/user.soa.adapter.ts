import { UserRepository } from "../../application/port/out/user.repository";
import { Injectable, Logger } from "@nestjs/common";
import { User } from "../../application/model/user";
import { InjectDataSource } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { Token } from "../../application/model/token";

//TODO: implementacion sql momentanea por pruebas, hay que implementar SOA
@Injectable()
export class UserSoaAdapter implements UserRepository {

  private readonly logger = new Logger(UserSoaAdapter.name);

  async findByBillerId(billerId: string | null): Promise<User[]> {

    throw new Error("Method not allowed")
  }

  update(user: User): Promise<User|any> {
    throw new Error("Method not allowed")
  }

  async create(token: Token, user: User): Promise<User> {
    this.logger.debug(`Creando usuario ${user}`);
    //TODO INICIO
    let userResult = await Promise.resolve(undefined);
    //TODO FIN
    this.logger.debug(`Usuario creado ${userResult}`);
    //en este ultimo argumento que usamos en el return del contructor del user iria lo que devuelve el servicio SOA
    // que nosotros consideramos ID Facturador
    return new User(user.id,user.name,user.lastName, null);
  }

}