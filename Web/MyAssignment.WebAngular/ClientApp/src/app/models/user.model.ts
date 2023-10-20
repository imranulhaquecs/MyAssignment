export class User {
  constructor(userId?: string, name?: string, emailId?: string, mobileNumber?: string, password?: string) {

    this.userId = userId;
    this.name = name;
    this.emailId = emailId;
    this.mobileNumber = mobileNumber;
    this.password = password;
  }

  public userId?: string;
  public name?: string;
  public emailId?: string;
  public mobileNumber?: string;
  public password?: string;
}
