import Schedule from "../../src/domain/entity/schedule";
import ScheduleException from "../../src/domain/exception/schedule-exception";
import CancelScheduleAppointment from "../../src/domain/usecase/cancel-schedule-appointment/cancel-schedule-appoitment";
import MemoryConnection from "../../src/infrastructure/repository/database/memory-connection";

import ScheduleRepositoryMemory from "../../src/infrastructure/repository/schedule-repository-memory";

test('Should cancel usecase schedule appointment', async () => {
  const repository = new ScheduleRepositoryMemory(new MemoryConnection());
  const useCase = new CancelScheduleAppointment(repository);

  const schedule = Schedule.create(1, 1, 1, 1);
  const schedule_id = await repository.createSchedule(schedule);

  await useCase.execute(schedule_id);

  const scheduleData = await repository.getSchedule(schedule_id);
  expect(scheduleData.schedule_status).toBe('CANCELED');
  expect(scheduleData.bullet_id).toBeUndefined();
})

test('Should receive schedule not found when cancel schedule appointment not created', async () => {
  const repository = new ScheduleRepositoryMemory(new MemoryConnection());
  const useCase = new CancelScheduleAppointment(repository);

  const exception = { name: 'SCHEDULE_EXCEPTION', message: 'Schedule not found', status: 404 };
  await expect(() => useCase.execute(500)).rejects.toEqual(exception);
  await expect(() => useCase.execute(500)).rejects.toBeInstanceOf(ScheduleException);
})