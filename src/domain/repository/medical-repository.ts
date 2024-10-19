import Medical from "../entity/medical";
import Speciality from "../entity/speciality";

export default interface MedicalRepository {
  getMedicalsBySpeciality(speciality: number): Promise<Medical[]>;

  getMedicalById(id: number): Promise<Medical>;

  availableTo(bullet_code: string, id: number): Promise<boolean>;

  availableUrgentTo(bullet_code: string): Promise<Medical>;

  getSpecialities(): Promise<Speciality[]>;

  getSpecialityById(id: number): Promise<Speciality>;
}