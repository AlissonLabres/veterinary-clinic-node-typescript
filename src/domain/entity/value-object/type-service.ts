enum TypeServiceEnum {
  APPOINTMENT = 'APPOINTMENT',
  URGENT = 'URGENT'
}

export default class TypeService {
  value: TypeServiceEnum;

  constructor(typeService: keyof typeof TypeServiceEnum) {
    this.value = TypeServiceEnum[typeService];
  }
}