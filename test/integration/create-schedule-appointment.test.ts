import TimeOrDateException from "../../src/domain/exception/time-or-date-exception";
import CreateScheduleAppointment from "../../src/domain/usecase/create-schedule-appointment/create-schedule-appointment"
import ScheduleAppointmentInput from "../../src/domain/usecase/create-schedule-appointment/schedule-appointment-input";
import ScheduleAppointmentOutput from "../../src/domain/usecase/create-schedule-appointment/schedule-appointment-output";
import ScheduleRepositoryMemory from "../../src/infrastructure/repository/schedule-repository-memory"

test('Should create usecase schedule appointment', async () => {
  const repository = new ScheduleRepositoryMemory();
  const useCase = new CreateScheduleAppointment(repository);
  const input: ScheduleAppointmentInput = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_code: '2023-08-08T16:00'
  };

  const output: ScheduleAppointmentOutput = await useCase.execute(input);

  expect(output.schedule_id).toBeDefined();
  expect(output.schedule_status).toEqual('SCHEDULED');
  expect(output.type_service).toEqual('APPOINTMENT');
})

test('Don`t should create usecase schedule appointment with bullet not available', async () => {
  const repository = new ScheduleRepositoryMemory();
  const useCase = new CreateScheduleAppointment(repository);
  const input: ScheduleAppointmentInput = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_code: '2023-08-08T18:00'
  };
  
  const exception = { name: 'TIME_OR_DATE_EXCEPTION', message: 'Time or Date not available to schedule', status: 409 };
  await expect(() => useCase.execute(input)).rejects.toEqual(exception);
  await expect(() => useCase.execute(input)).rejects.toBeInstanceOf(TimeOrDateException);
})