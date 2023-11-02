import AnimalException from "../../exception/animal-exception";

export default class Age {
  private _value: number;

  constructor(age: number) {
    if (!age) {
      throw new AnimalException('Age is required');
    }

    if (age < 0) {
      throw new AnimalException('Age must be greater than 0');
    }

    this._value = age;
  }

  get value(): number {
    return this._value;
  }
}