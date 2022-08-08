import { User } from "../../model/user";


export interface UserRepository {
  findByBillerId(billerId: string | null): Promise<User[]>;
}
