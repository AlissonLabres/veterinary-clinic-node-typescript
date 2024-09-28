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
    const output: MedicalOutput[] = await usecase.execute("CASTRATE");
    expect(output.length).toEqual(0);
  });

  test("Should receive one item in list when execute usecase GetMedicalsBySpeciality", async () => {
    memoryConnection.medicals.push(MEDICAL());

    const output: MedicalOutput[] = await usecase.execute("VACCINATION");
    expect(output.length).toEqual(1);
  });
});
