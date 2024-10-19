import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import MedicalRepositoryMemory from "../../../src/infrastructure/repository/medical/medica-repository-memory";
import GetSpecialities from "../../../src/domain/usecase/medical/get-specialities/get-specialities";
import SpecialityOutput from "../../../src/domain/usecase/medical/get-specialities/speciality-output";

describe("Medical - get all specialities", () => {
  let memoryConnection: MemoryConnection;
  let usecase: GetSpecialities;

  beforeEach(() => {
    memoryConnection = new MemoryConnection();
    const repository = new MedicalRepositoryMemory(memoryConnection);
    usecase = new GetSpecialities(repository);
  });

  test("Should empty list when execute usecase GetSpecialities", async () => {
    const output: SpecialityOutput[] = await usecase.execute();
    expect(output.length).toEqual(0);
  });

  test("Should receive one item in list when execute usecase GetMedicalsBySpeciality", async () => {
    memoryConnection.specialities = [{ speciality_id: 5, speciality_name: "URGENT" }];

    const output: SpecialityOutput[] = await usecase.execute();
    expect(output.length).toEqual(1);
  });
});
