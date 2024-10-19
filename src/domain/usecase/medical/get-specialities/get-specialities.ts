import Speciality from "../../../entity/speciality";
import MedicalRepository from "../../../repository/medical-repository";
import SpecialityOutput from "./speciality-output";

export default class GetSpecialities {
  constructor(private readonly medicalRepository: MedicalRepository) {}

  async execute(): Promise<SpecialityOutput[]> {
    const specialities: Speciality[] = await this.medicalRepository.getSpecialities();
    const output: SpecialityOutput[] = [];
    for (const specialitiesData of specialities) {
      output.push(new SpecialityOutput(specialitiesData.speciality_id, specialitiesData.speciality_name));
    }

    return output;
  }
}
