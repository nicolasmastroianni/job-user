import { User } from "../../model/user";
import { Token } from "../../model/token";


export interface UserRepository {
  findByBillerId(billerId: string | null): Promise<User[]>;
  create(token : Token, user : User) : Promise<User>;
  update(user : User) : Promise<User|any>;
}
