export interface IUserInteractor {
  create(): any;
}

export interface IAuthInteractor {
  smsVerification(phoneNumber: string): any;
}
