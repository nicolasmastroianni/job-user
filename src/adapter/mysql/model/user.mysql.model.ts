import { User } from "../../../application/model/user";

export class UserMySqlModel {
  private id: number | null;
  private name: string | null;
  private lastName: string | null;
  private billerId: string | null;

  constructor(id: number | null, name: string | null, lastName: string | null, billerId: string | null) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.billerId = billerId;
  }

  get getId(): number | null {
    return this.id;
  }

  get getName(): string | null {
    return this.name;
  }

  get getLastName(): string | null {
    return this.lastName;
  }

  get getBillerId(): string | null {
    return this.billerId;
  }

  toDomain(): User {
    return new User(
      this.id,
      this.name,
      this.lastName,
      this.billerId);
  }


}
