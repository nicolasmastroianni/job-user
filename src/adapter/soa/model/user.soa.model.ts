export class UserSoaModel {
  private readonly _id: number | null
  private readonly _name: string | null
  private readonly _lastName: string | null
  private readonly _billerId: string | null

  constructor( id: number | null, name: string | null, lastName: string | null, billerId: string | null) {
    this._id = id;
    this._name = name;
    this._lastName = lastName;
    this._billerId = billerId;
  }

  get id(): number | null {
    return this._id;
  }

  get name(): string | null {
    return this._name;
  }

  get lastName(): string | null {
    return this._lastName;
  }

  get billerId(): string | null {
    return this._billerId;
  }
}
