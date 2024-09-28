import ScheduleException from "../../../src/domain/exception/schedule-exception";
import CancelScheduleAppointment from "../../../src/domain/usecase/schedule/cancel-schedule-appointment/cancel-schedule-appoitment";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";

import ScheduleRepositoryMemory from "../../../src/infrastructure/repository/schedule/schedule-repository-memory";

import { SCHEDULE_APPOINTMENT } from "../../mock/schedule.mock";

describe("Schedule - cancel schedule appointment", () => {
  let memoryConnection: MemoryConnection;
  let repository: ScheduleRepositoryMemory;
  let usecase: CancelScheduleAppointment;

  beforeEach(() => {
    memoryConnection = new MemoryConnection();
    repository = new ScheduleRepositoryMemory(memoryConnection);
    usecase = new CancelScheduleAppointment(repository);
  });

  test("Should cancel usecase schedule appointment", async () => {
    memoryConnection.schedules.push(SCHEDULE_APPOINTMENT());

    await usecase.execute(1);
    const schedule = await repository.getSchedule(1);

    expect(schedule.schedule_status).toBe("CANCELED");
    expect(schedule.bullet_id).toBeUndefined();
  });

  test("Should receive schedule not found when cancel schedule appointment not created", async () => {
    const exception = { name: "SCHEDULE_EXCEPTION", message: "Schedule not found", status: 404 };
    await expect(() => usecase.execute(500)).rejects.toEqual(exception);
    await expect(() => usecase.execute(500)).rejects.toBeInstanceOf(ScheduleException);
  });
});
