import AllScheduleOutput from "../../../src/domain/usecase/schedule/get-all-schedules/all-schedule-output";
import GetAllSchedules from "../../../src/domain/usecase/schedule/get-all-schedules/get-all-schedules";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import ScheduleRepositoryMemory from "../../../src/infrastructure/repository/schedule/schedule-repository-memory";
import { ANIMAL, USER } from "../../mock";
import { BULLET } from "../../mock/bullet.mock";
import { SCHEDULE_APPOINTMENT } from "../../mock/schedule.mock";

describe("Schedule - Get all schedules by user", () => {
  let memoryConnection: MemoryConnection;
  let usecase: GetAllSchedules;

  beforeEach(() => {
    memoryConnection = new MemoryConnection();
    const repository = new ScheduleRepositoryMemory(memoryConnection);
    usecase = new GetAllSchedules(repository);
  });

  test("Should empty list when execute usecase GetAllSchedules", async () => {
    const output: AllScheduleOutput[] = await usecase.execute(1);
    expect(output.length).toEqual(0);
  });

  test("Should receive one item in list when execute usecase GetAllSchedules", async () => {
    memoryConnection.users.push(USER("1"));
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.bullets.push({ ...BULLET(), schedule_id: 1 });
    memoryConnection.schedules.push(SCHEDULE_APPOINTMENT());

    const [output]: AllScheduleOutput[] = await usecase.execute(1);

    expect(output.schedule_id).toBeDefined();
    expect(output.schedule_status).toEqual("SCHEDULED");
    expect(output.type_service).toEqual("APPOINTMENT");
    expect(output.bullet_code).toEqual("2023-08-08T16:00");
  });
});
