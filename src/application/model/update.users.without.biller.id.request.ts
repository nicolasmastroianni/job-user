export class UpdateUsersWithoutBillerIdRequest {

  private readonly _billerId: string | null

  constructor( billerId: string | null ) {
    this._billerId = billerId;
  }

  get billerId(): string | null {
    return this._billerId;
  }
}