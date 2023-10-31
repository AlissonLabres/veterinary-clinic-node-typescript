import MedicalException from "../../src/domain/exception/medical-exception";
import TimeOrDateException from "../../src/domain/exception/time-or-date-exception";
import CreateScheduleUrgent from "../../src/domain/usecase/create-schedule-urgent/create-schedule-urgent";
import ScheduleUrgentInput from "../../src/domain/usecase/create-schedule-urgent/schedule-urgent-input";
import ScheduleUrgentOutput from "../../src/domain/usecase/create-schedule-urgent/schedule-urgent-output";
import MemoryConnection from "../../src/infrastructure/repository/database/memory-connection";
import MedicalRepositoryMemory from "../../src/infrastructure/repository/medica-repository-memory";
import ScheduleRepositoryMemory from "../../src/infrastructure/repository/schedule-repository-memory";

test('Should create usecase schedule urgent', async () => {
  const memoryConnection = new MemoryConnection();
  const medicalRepository = new MedicalRepositoryMemory(memoryConnection);
  const scheduleRepository = new ScheduleRepositoryMemory(memoryConnection);
  const useCase = new CreateScheduleUrgent(scheduleRepository, medicalRepository);
  const input: ScheduleUrgentInput = {
    user_id: 1,
    animal_id: 1,
    urgency_date: '2023-08-05T10:00'
  };

  const output: ScheduleUrgentOutput = await useCase.execute(input);

  expect(output.schedule_id).toBeDefined();
  expect(output.schedule_status).toEqual('SCHEDULED');
  expect(output.type_service).toEqual('URGENT');

})

test('Don`t should create usecase schedule urgent with bullet not available', async () => {
  const memoryConnection = new MemoryConnection();
  const medicalRepository = new MedicalRepositoryMemory(memoryConnection);
  const scheduleRepository = new ScheduleRepositoryMemory(memoryConnection);
  const useCase = new CreateScheduleUrgent(scheduleRepository, medicalRepository);
  const input: ScheduleUrgentInput = {
    user_id: 1,
    animal_id: 1,
    urgency_date: '2023-10-08T18:00'
  };

  const exception = { name: 'TIME_OR_DATE_EXCEPTION', message: 'Time or Date not available to schedule', status: 409 };
  await expect(() => useCase.execute(input)).rejects.toEqual(exception);
  await expect(() => useCase.execute(input)).rejects.toBeInstanceOf(TimeOrDateException);
})

test('Don`t should create usecase schedule urgent without medical available', async () => {
  const memoryConnection = new MemoryConnection();
  const medicalRepository = new MedicalRepositoryMemory(memoryConnection);
  const scheduleRepository = new ScheduleRepositoryMemory(memoryConnection);
  const useCase = new CreateScheduleUrgent(scheduleRepository, medicalRepository);
  const input: ScheduleUrgentInput = {
    user_id: 1,
    animal_id: 1,
    urgency_date: '2023-08-05T10:00'
  };

  await useCase.execute(input);

  const exception = { name: 'MEDICAL_EXCEPTION', message: 'Medical not found', status: 404 };
  await expect(() => useCase.execute(input)).rejects.toEqual(exception);
  await expect(() => useCase.execute(input)).rejects.toBeInstanceOf(MedicalException);
})