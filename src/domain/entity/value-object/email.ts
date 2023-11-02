import UserException from "../../exception/user-exception";

export default class Email {
  private _value: string;

  constructor(email: string) {
    const emailTrimmed = email.trim();

    if (!emailTrimmed) {
      throw new UserException('Email is required');
    }

    if (!emailTrimmed.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)) {
      throw new UserException('Email is invalid');
    }

    if (emailTrimmed.length < 3 || emailTrimmed.length > 255) {
      throw new UserException('Email must have a minimum of 3 characters and a maximum of 255 characters');
    }

    this._value = emailTrimmed;
  }

  get value(): string {
    return this._value;
  }
}