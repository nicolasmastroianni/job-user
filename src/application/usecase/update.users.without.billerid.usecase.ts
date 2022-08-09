import { Inject, Injectable, Logger } from "@nestjs/common";
import { UpdateUsersWithoutBillerIdCommand } from "../port/in/updateUsersWithoutBillerIdCommand";
import { User } from "../model/user";
import { UserRepository } from "../port/out/user.repository";
import { UpdateUsersWithoutBillerIdRequest } from "../model/update.users.without.biller.id.request";
import { TokenRepository } from "../port/out/token.repository";
import { Token } from "../model/token";

@Injectable()
export class UpdateUsersWithoutBillerIdUseCase implements UpdateUsersWithoutBillerIdCommand {

  private readonly logger = new Logger(UpdateUsersWithoutBillerIdUseCase.name);

  constructor(@Inject("usersToUpdateRepository") private readonly userRepository: UserRepository,
              @Inject("userUpdate") private readonly userRegisterRepository: UserRepository,
              @Inject("tokenRepository") private readonly tokenRepository: TokenRepository) {
  }

  async execute(command: UpdateUsersWithoutBillerIdRequest): Promise<User[]> {
    this.logger.debug(`Se inicia caso de uso para actualizar usuarios con Id Facturador con valor ${command.billerId}`);
    let usersToUpdate: User[] = await this.userRepository.findByBillerId(command.billerId);
    let token: Token = await this.tokenRepository.get();

    let updatedUsers = usersToUpdate
      .map(async (user) => {
        await this.userRegisterRepository.create(token, user)
          .then(async (u) => {
            await this.userRepository.update(this.buildUser(user, u)).then((u) => {
              return u;
            });
          });
      });

    this.logger.debug(`Usuarios modificados ${updatedUsers}`);
    /*return updatedUsers;*/
    return null;
  }

  private buildUser(user: User, userWithBillerId: User) {
    return new User(user.id, user.name, user.lastName, userWithBillerId.billerId);
  }
}