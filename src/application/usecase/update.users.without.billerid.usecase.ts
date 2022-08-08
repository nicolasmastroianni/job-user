import { Inject, Injectable, Logger } from "@nestjs/common";
import { UpdateUsersWithoutBillerIdCommand } from "../port/in/updateUsersWithoutBillerIdCommand";
import { User } from "../model/user";
import { UserRepository } from "../port/out/user.repository";
import { UpdateUsersWithoutBillerIdRequest } from "../model/update.users.without.biller.id.request";

@Injectable()
export class UpdateUsersWithoutBillerIdUseCase implements UpdateUsersWithoutBillerIdCommand {

  private readonly logger = new Logger(UpdateUsersWithoutBillerIdUseCase.name);

  constructor(@Inject("usersToUpdateRepository") private readonly usersToUpdateRepository: UserRepository,
              @Inject("userUpdate") private readonly userUpdate: UserRepository) {
  }

  async execute(command: UpdateUsersWithoutBillerIdRequest): Promise<User[]> {
    this.logger.debug(`Se inicia caso de uso para actualizar usuarios con ${command}`);
    let usersToUpdate: User[] = await this.usersToUpdateRepository.findByBillerId(command.billerId);
    //la idea es que userUpdate prontamente tenga el metodo post para pegarle a amy en su implementacion
    //por el momento esta asi para pruebas la inyeccion de dependencias de distintas implementaciones de interfaces
    let users2: User[] = await this.userUpdate.findByBillerId(command.billerId);

    // TODO: pegarle al login de amy para obtener el Token
    // TODO: por cada usuario pegarle a amy

    this.logger.debug("Finaliza caso de uso para actualizar usuarios");
    return usersToUpdate;
  }
}