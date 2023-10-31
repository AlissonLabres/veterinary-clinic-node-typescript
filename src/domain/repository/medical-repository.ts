import Medical from "../entity/medical";

export default interface MedicalRepository {
  
  getMedicalsBySpeciality(speciality: string): Promise<Medical[]>;  

  getMedicalById(id: number): Promise<Medical>;
  
  availableTo(bullet_code: string, id: number): Promise<boolean>;

}