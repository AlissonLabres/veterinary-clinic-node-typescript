enum TypeAnimalEnum {
  CAT = 'CAT',
  DOG = 'DOG',
  OTHER = 'OTHER',
}

export default class TypeAnimal {
  value: TypeAnimalEnum;

  constructor(typeService: keyof typeof TypeAnimalEnum) {
    this.value = TypeAnimalEnum[typeService];
  }
}