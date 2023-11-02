import UserException from "../../exception/user-exception";

export default class Phone {
  private _value: string;

  constructor(phone: string) {
    if (!phone) {
      throw new UserException('Phone is required');
    }

    const phoneReplace = phone.replace(/\D/g, '');
    if (!/^\d{11}$/.test(phoneReplace)) {
      throw new UserException('Phone must have a 11 characters');
    }

    this._value = phoneReplace;
  }

  get value(): string {
    return this._value;
  }
}