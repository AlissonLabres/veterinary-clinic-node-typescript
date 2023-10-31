import getMedicalsBySpeciality from "../../src/domain/usecase/get-medical-by-speciality/get-medical-by-speciality";
import MedicalOutput from "../../src/domain/usecase/get-medical-by-speciality/medical-output";
import MemoryConnection from "../../src/infrastructure/repository/database/memory-connection";
import MedicalRepositoryMemory from "../../src/infrastructure/repository/medica-repository-memory";

test('Should empty list when execute usecase GetMedicalsBySpeciality', async () => {
  const memoryConnection = new MemoryConnection();
  const repository = new MedicalRepositoryMemory(memoryConnection);
  const useCase = new getMedicalsBySpeciality(repository);
  const output: MedicalOutput[] = await useCase.execute('CASTRATE');

  expect(output.length).toEqual(0);
})
