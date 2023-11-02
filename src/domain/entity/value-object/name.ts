import UserException from "../../exception/user-exception";

export default class Name {
  private _value: string;

  constructor(name: string) {
    const nameTrimmed = name.trim();
    if (!nameTrimmed) {
      throw new UserException('Name is required');
    }

    if (nameTrimmed.length < 3 || nameTrimmed.length > 255) {
      throw new UserException('Name must have a minimum of 3 characters and maximum of 255 characters');
    }

    if (nameTrimmed.split(' ').length < 2) {
      throw new UserException('Name must have at least two names');
    }

    this._value = nameTrimmed;
  }

  get value(): string {
    return this._value;
  }

}