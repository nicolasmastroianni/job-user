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
    this.logger.debug(`Se inicia caso de uso para actualizar usuarios con Id Facturador ${command.billerId}`);
    let usersToUpdate: User[] = await this.userRepository.findByBillerId(command.billerId);
    let token : Token = await this.tokenRepository.get();

    let updatedUsers : Promise<User>[] = usersToUpdate.map(async (user) => {
      let userResponse = await this.userRegisterRepository.create(token, user);
      await this.userRepository.update(userResponse);
      return new User(user.name,user.lastName, userResponse.billerId)
    } )

    this.logger.debug("Finaliza caso de uso para actualizar usuarios");
    return null;
  }
}