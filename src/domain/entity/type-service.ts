enum TypeServiceEnum {
  APPOINTMENT = 'APPOINTMENT',
  URGENT = 'URGENT'
}

export default class TypeService {
  value: TypeServiceEnum;

  constructor(typeService: keyof typeof TypeServiceEnum) {
    if (TypeServiceEnum[typeService]) {
      this.value = TypeServiceEnum[typeService];
    } else {
      throw new Error("Type Service not found");
    }
  }
}