import Medical from "../../../entity/medical";
import Speciality from "../../../entity/speciality";
import MedicalRepository from "../../../repository/medical-repository";
import MedicalOutput from "./medical-output";

export default class GetMedicalsBySpeciality {
  constructor(private readonly medicalRepository: MedicalRepository) {}

  async execute(speciality_id: number): Promise<MedicalOutput[]> {
    const speciality: Speciality = await this.medicalRepository.getSpecialityById(speciality_id);
    const medicals: Medical[] = await this.medicalRepository.getMedicalsBySpeciality(speciality.speciality_id);
    const output: MedicalOutput[] = [];
    for (const medical of medicals) {
      output.push(
        new MedicalOutput(medical.medical_id!, medical.medical_name, medical.medical_phone, medical.medical_email)
      );
    }

    return output;
  }
}
