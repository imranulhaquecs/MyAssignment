export class Login {
  constructor(userId?: string, password?: string) {

    this.userId = userId;
    this.password = password;
  }

  public userId?: string;
  public password?: string;
}
