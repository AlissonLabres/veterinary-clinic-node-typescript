import Medical from "../../../entity/medical";
import MedicalRepository from "../../../repository/medical-repository";
import MedicalOutput from "./medical-output";

export default class getMedicalsBySpeciality {

  constructor(private readonly medicalRepository: MedicalRepository) { }

  async execute(speciality: string): Promise<MedicalOutput[]> {
    const medicals: Medical[] = await this.medicalRepository.getMedicalsBySpeciality(speciality);
    const output: MedicalOutput[] = [];
    for (const medical of medicals) {
      output.push(
        new MedicalOutput(
          medical.medical_id!,
          medical.medical_name,
          medical.medical_phone,
          medical.medical_email,
          medical.medical_specialities.find(s => s.value === speciality)?.value!,
        )
      );
    }

    return output;
  }

}