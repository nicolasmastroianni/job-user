import { User } from "../../model/user";
import { UpdateUsersWithoutBillerIdRequest } from "../../model/update.users.without.biller.id.request";

export interface UpdateUsersWithoutBillerIdCommand {
  execute(request: UpdateUsersWithoutBillerIdRequest): Promise<User[]>;
}