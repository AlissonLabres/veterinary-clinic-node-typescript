import Schedule from "../../../src/domain/entity/schedule";
import User from "../../../src/domain/entity/user";
import CreateScheduleAppointment from "../../../src/domain/usecase/schedule/create-schedule-appointment/create-schedule-appointment"
import AllScheduleOutput from "../../../src/domain/usecase/schedule/get-all-schedules/all-schedule-output";
import GetAllSchedules from "../../../src/domain/usecase/schedule/get-all-schedules/get-all-schedules";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import MedicalRepositoryMemory from "../../../src/infrastructure/repository/medical/medica-repository-memory";
import ScheduleRepositoryMemory from "../../../src/infrastructure/repository/schedule/schedule-repository-memory"
import UserRepositoryMemory from "../../../src/infrastructure/repository/user/user-repository-memory";

test('Should empty list when execute usecase GetAllSchedules', async () => {
  const repository = new ScheduleRepositoryMemory(new MemoryConnection());
  const useCase = new GetAllSchedules(repository);
  const output: AllScheduleOutput[] = await useCase.execute(1);

  expect(output.length).toEqual(0);
})

test('Should create schedule and list all', async () => {
  const memoryConnection = new MemoryConnection();
  const userRepository = new UserRepositoryMemory(memoryConnection);
  const { user_id } = await userRepository.create(
    User.create({
      user_name: 'Name Testing',
      user_email: 'email@testing.com.br',
      user_phone: '(41) 98888-2222'
    })
  );

  const scheduleRepository = new ScheduleRepositoryMemory(memoryConnection);
  await scheduleRepository.createSchedule(Schedule.create(
    user_id!,
    1,
    1,
    1
  ));

  const useCase = new GetAllSchedules(scheduleRepository);
  const [output]: AllScheduleOutput[] = await useCase.execute(user_id!);

  expect(output.schedule_id).toBeDefined();
  expect(output.schedule_status).toEqual('SCHEDULED');
  expect(output.type_service).toEqual('APPOINTMENT');
  expect(output.bullet_code).toEqual('2023-08-08T16:00');
})
