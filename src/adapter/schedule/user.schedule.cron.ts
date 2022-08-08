import { Inject, Injectable, Logger } from "@nestjs/common";
import {Cron} from "@nestjs/schedule";
import {UpdateUsersWithoutBillerIdCommand} from "../../application/port/in/updateUsersWithoutBillerIdCommand";
import { UpdateUsersWithoutBillerIdRequest } from "../../application/model/update.users.without.biller.id.request";

// issue: argumentos para pasar cuando se levante el job??? para poder correr el job en fechas especificas
//// let dateTo = dateTo != null ? dateTo : ''
//// let dateFrom = dateFrom != null ? dateTo : ''
@Injectable()
export class UserScheduleCron{
  private readonly logger = new Logger(UserScheduleCron.name);
  constructor(@Inject('UPDATE_USERS') private readonly updateUsersWithoutBillerIdCommand: UpdateUsersWithoutBillerIdCommand) {}

  @Cron("20 * * * * *")
  syncComponents(){
    this.logger.debug("Inicializando proceso schedule de users")
    this.updateUsersWithoutBillerIdCommand.execute(this.buildRequest())
      .then(r => {
        this.logger.debug("Finalizando proceso schedule de users")
      });
  }

  private buildRequest() {
    return new UpdateUsersWithoutBillerIdRequest(null);
  }
}