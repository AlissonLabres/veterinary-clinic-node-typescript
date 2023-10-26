import CreateScheduleAppointment from "../../src/domain/usecase/create-schedule-appointment/create-schedule-appointment"
import AllScheduleOutput from "../../src/domain/usecase/get-all-schedules/all-schedule-output";
import GetAllSchedules from "../../src/domain/usecase/get-all-schedules/get-all-schedules";
import ScheduleRepositoryMemory from "../../src/infrastructure/repository/schedule-repository-memory"

test('Should empty list when execute usecase GetAllSchedules', async () => {
  const repository = new ScheduleRepositoryMemory();
  const useCase = new GetAllSchedules(repository);
  const output: AllScheduleOutput[] = await useCase.execute(1);

  expect(output.length).toEqual(0);
})

test('Should create schedule and list all', async () => {
  const repository = new ScheduleRepositoryMemory();
  const create = new CreateScheduleAppointment(repository);
  await create.execute({
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_code: '2023-08-08T16:00'
  });

  const useCase = new GetAllSchedules(repository);
  const [output]: AllScheduleOutput[] = await useCase.execute(1);

  expect(output.schedule_id).toBeDefined();
  expect(output.schedule_status).toEqual('SCHEDULED');
  expect(output.type_service).toEqual('APPOINTMENT');
  expect(output.bullet_code).toEqual('2023-08-08T16:00');
})
