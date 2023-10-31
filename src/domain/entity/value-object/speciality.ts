import SpecialityException from "../../exception/speciality-exception";

enum SpecialityEnum {
  CASTRATE = 'CASTRATE',
  VACCINATION = 'VACCINATION',
  GENERAL_DOCTOR = 'GENERAL_DOCTOR',
  BATH_GROOMING = 'BATH_GROOMING',
  URGENT = 'URGENT'
}

export default class Speciality {
  value: SpecialityEnum;

  constructor(typeService: keyof typeof SpecialityEnum) {
    this.value = SpecialityEnum[typeService];
  }

  static getSpecialities(medical_specialities: string) {
    const specialities = medical_specialities
      .split(',')
      .map((speciality) => new Speciality(speciality as keyof typeof SpecialityEnum))
      .filter((speciality) => speciality.value);

    if (!specialities.length) {
      throw new SpecialityException();
    }

    return specialities;
  }
}