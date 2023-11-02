import BusinessException from "./business-exception";

export default class UserException implements BusinessException, Error {
  name: string = 'USER_EXCEPTION';
  status: number = 400;
  message: string;

  constructor(message: string = 'User is invalid') {
    this.message = message;
  }
}