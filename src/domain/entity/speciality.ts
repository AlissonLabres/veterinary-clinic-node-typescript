import SpecialityException from "../exception/speciality-exception";

export default class Speciality {
  speciality_name: string;
  speciality_id: number;

  constructor(speciality_id: number, speciality_name: string) {
    this.speciality_id = speciality_id;
    this.speciality_name = speciality_name;
  }

  static restore(dto: any) {
    if (!dto || !dto.speciality_id) {
      throw new SpecialityException();
    }

    return new Speciality(dto.speciality_id, dto.speciality_name);
  }
}
