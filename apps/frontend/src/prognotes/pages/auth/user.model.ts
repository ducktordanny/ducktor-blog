export class User {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public createdAt: Date,
    private _token: string,
    private _expirationDate: Date,
  ) {}

  public get token() {
    return this._token;
  }
}
