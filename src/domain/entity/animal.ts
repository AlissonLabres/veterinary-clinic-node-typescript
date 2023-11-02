import AnimalException from "../exception/animal-exception";
import Age from "./value-object/age";
import AnimalName from "./value-object/animal-name";
import TypeAnimal from "./value-object/type-animal";

export default class Animal {
  animal_name: AnimalName;
  animal_age: Age;
  animal_weight: number;
  animal_type: TypeAnimal;
  animal_breed: string;
  animal_id: number | undefined;

  constructor(
    name: string,
    age: number,
    weight: number,
    type: 'CAT' | 'DOG' | 'OTHER',
    breed: string,
    id?: number
  ) {
    this.animal_name = new AnimalName(name);
    this.animal_age = new Age(age);
    this.animal_weight = weight;
    this.animal_type = new TypeAnimal(type);
    this.animal_breed = breed;
    this.animal_id = id;
  }

  static create(dto: any) {
    if (!dto || !dto.animal_weight || !dto.animal_type || !dto.animal_breed) {
      throw new AnimalException();
    }

    const animal = new Animal(
      dto.animal_name,
      dto.animal_age,
      dto.animal_weight,
      dto.animal_type,
      dto.animal_breed
    );

    return animal;
  }

  static restore(dto: any) {
    if (!dto || !dto.animal_id) {
      throw new AnimalException();
    }

    const animal = new Animal(
      dto.animal_name,
      dto.animal_age,
      dto.animal_weight,
      dto.animal_type,
      dto.animal_breed,
      dto.animal_id
    );

    return animal;
  }
}