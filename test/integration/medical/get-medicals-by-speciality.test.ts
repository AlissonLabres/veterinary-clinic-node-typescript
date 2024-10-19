import GetMedicalsBySpeciality from "../../../src/domain/usecase/medical/get-medical-by-speciality/get-medical-by-speciality";
import MedicalOutput from "../../../src/domain/usecase/medical/get-medical-by-speciality/medical-output";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import MedicalRepositoryMemory from "../../../src/infrastructure/repository/medical/medica-repository-memory";
import { MEDICAL } from "../../mock/medical.mock";

describe("Medical - get all medicals by speciality", () => {
  let memoryConnection: MemoryConnection;
  let usecase: GetMedicalsBySpeciality;

  beforeEach(() => {
    memoryConnection = new MemoryConnection();
    const repository = new MedicalRepositoryMemory(memoryConnection);
    usecase = new GetMedicalsBySpeciality(repository);
  });

  test("Should empty list when execute usecase GetMedicalsBySpeciality", async () => {
    memoryConnection.specialities.push({ speciality_id: 1, speciality_name: "URGENT" });

    const output: MedicalOutput[] = await usecase.execute(1);
    expect(output.length).toEqual(0);
  });

  test("Should receive one item in list when execute usecase GetMedicalsBySpeciality", async () => {
    memoryConnection.medicalSpecialities.push({ speciality_id: 1, medical_id: 1 });
    memoryConnection.specialities.push({ speciality_id: 1, speciality_name: "URGENT" });
    memoryConnection.medicals.push(MEDICAL());

    const output: MedicalOutput[] = await usecase.execute(1);
    expect(output.length).toEqual(1);
  });
});
