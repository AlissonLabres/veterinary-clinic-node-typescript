import AnimalException from "../../exception/animal-exception";

export default class AnimalName {
  private _value: string;

  constructor(name: string) {
    const nameTrimmed = name.trim();

    if (!nameTrimmed) {
      throw new AnimalException('Name is required');
    }

    if (nameTrimmed.length < 3 || nameTrimmed.length > 255) {
      throw new AnimalException('Name must have a minimum of 3 characters and maximum of 255 characters');
    }

    this._value = name;
  }

  get value(): string {
    return this._value;
  }
}