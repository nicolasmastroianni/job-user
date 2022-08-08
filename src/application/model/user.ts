export class User {
  private readonly _name: string | null
  private readonly _lastName: string | null
  private readonly _billerId: string | null

  constructor( name: string | null, lastName: string | null, billerId: string | null ) {
    this._name = name;
    this._lastName = lastName;
    this._billerId = billerId;
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
