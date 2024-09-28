import AnimalException from "../../../src/domain/exception/animal-exception";
import MedicalException from "../../../src/domain/exception/medical-exception";
import TimeOrDateException from "../../../src/domain/exception/time-or-date-exception";
import UserException from "../../../src/domain/exception/user-exception";
import CreateScheduleUrgent from "../../../src/domain/usecase/schedule/create-schedule-urgent/create-schedule-urgent";
import ScheduleUrgentInput from "../../../src/domain/usecase/schedule/create-schedule-urgent/schedule-urgent-input";
import ScheduleUrgentOutput from "../../../src/domain/usecase/schedule/create-schedule-urgent/schedule-urgent-output";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import MedicalRepositoryMemory from "../../../src/infrastructure/repository/medical/medica-repository-memory";
import ScheduleRepositoryMemory from "../../../src/infrastructure/repository/schedule/schedule-repository-memory";
import UserRepositoryMemory from "../../../src/infrastructure/repository/user/user-repository-memory";
import { ANIMAL, USER } from "../../mock";
import { BULLET } from "../../mock/bullet.mock";
import { MEDICAL } from "../../mock/medical.mock";

describe("Test integration create schedule urgent", () => {
  let memoryConnection: MemoryConnection;
  let usecase: CreateScheduleUrgent;

  beforeEach(async () => {
    memoryConnection = new MemoryConnection();
    const userRepository = new UserRepositoryMemory(memoryConnection);
    const medicalRepository = new MedicalRepositoryMemory(memoryConnection);
    const scheduleRepository = new ScheduleRepositoryMemory(memoryConnection);
    usecase = new CreateScheduleUrgent(scheduleRepository, medicalRepository, userRepository);
  });

  test("Should create usecase schedule urgent", async () => {
    memoryConnection.bullets.push(BULLET());
    memoryConnection.users.push(USER("1"));
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleUrgentInput = {
      user_id: 1,
      animal_id: 1,
      urgency_date: "2023-08-05T10:00",
    };

    const output: ScheduleUrgentOutput = await usecase.execute(input);

    expect(output.schedule_id).toBeDefined();
    expect(output.schedule_status).toEqual("SCHEDULED");
    expect(output.type_service).toEqual("URGENT");
  });

  test("Dont should create usecase schedule urgent with bullet not available", async () => {
    memoryConnection.bullets.push({ ...BULLET(), schedule_id: 1 });
    memoryConnection.users.push(USER("1"));
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleUrgentInput = {
      user_id: 1,
      animal_id: 1,
      urgency_date: "2023-10-08T18:00",
    };

    const exception = {
      name: "TIME_OR_DATE_EXCEPTION",
      message: "Time or Date not available to schedule",
      status: 409,
    };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(TimeOrDateException);
  });

  test("Dont should create schedule urgent without medical available", async () => {
    memoryConnection.bullets.push({ ...BULLET() }, { ...BULLET(), bullet_id: 2 });
    memoryConnection.users.push(USER("1"));
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleUrgentInput = {
      user_id: 1,
      animal_id: 1,
      urgency_date: "2023-08-05T10:00",
    };

    await usecase.execute(input);

    const exception = { name: "MEDICAL_EXCEPTION", message: "Medical not found", status: 404 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(MedicalException);
  });

  test("Dont should create usecase schedule urgent without user create", async () => {
    memoryConnection.bullets.push(BULLET());
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleUrgentInput = {
      user_id: 999,
      animal_id: 1,
      urgency_date: "2023-08-05T10:00",
    };

    const exception = { name: "USER_EXCEPTION", message: "User is invalid", status: 400 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(UserException);
  });

  test("Dont should create usecase schedule urgent without animal create", async () => {
    memoryConnection.bullets.push(BULLET());
    memoryConnection.users.push(USER("1"));
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleUrgentInput = {
      user_id: 1,
      animal_id: 999,
      urgency_date: "2023-08-05T10:00",
    };

    const exception = { name: "ANIMAL_EXCEPTION", message: "Animal doesn't belong to the user", status: 404 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(AnimalException);
  });
});
