import AnimalException from "../../../src/domain/exception/animal-exception";
import MedicalBusyException from "../../../src/domain/exception/medical-busy-exception";
import MedicalException from "../../../src/domain/exception/medical-exception";
import TimeOrDateException from "../../../src/domain/exception/time-or-date-exception";
import UserException from "../../../src/domain/exception/user-exception";
import CreateScheduleAppointment from "../../../src/domain/usecase/schedule/create-schedule-appointment/create-schedule-appointment";
import ScheduleAppointmentInput from "../../../src/domain/usecase/schedule/create-schedule-appointment/schedule-appointment-input";
import ScheduleAppointmentOutput from "../../../src/domain/usecase/schedule/create-schedule-appointment/schedule-appointment-output";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import MedicalRepositoryMemory from "../../../src/infrastructure/repository/medical/medica-repository-memory";
import ScheduleRepositoryMemory from "../../../src/infrastructure/repository/schedule/schedule-repository-memory";
import UserRepositoryMemory from "../../../src/infrastructure/repository/user/user-repository-memory";
import { ANIMAL, USER } from "../../mock";
import { BULLET } from "../../mock/bullet.mock";
import { MEDICAL } from "../../mock/medical.mock";

describe("Schedule - create schedule appointment", () => {
  let memoryConnection: MemoryConnection;
  let usecase: CreateScheduleAppointment;

  beforeEach(async () => {
    memoryConnection = new MemoryConnection();
    const userRepository = new UserRepositoryMemory(memoryConnection);

    const medicalRepository = new MedicalRepositoryMemory(memoryConnection);
    const scheduleRepository = new ScheduleRepositoryMemory(memoryConnection);

    usecase = new CreateScheduleAppointment(scheduleRepository, medicalRepository, userRepository);
  });

  test("Should create usecase schedule appointment", async () => {
    memoryConnection.users.push(USER("1"));
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.bullets.push(BULLET());
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleAppointmentInput = {
      user_id: 1,
      medical_id: 1,
      animal_id: 1,
      bullet_code: "2023-08-08T16:00",
    };

    const output: ScheduleAppointmentOutput = await usecase.execute(input);

    expect(output.schedule_id).toBeDefined();
    expect(output.schedule_status).toEqual("SCHEDULED");
    expect(output.type_service).toEqual("APPOINTMENT");
  });

  test("Dont should create usecase schedule appointment with bullet not available", async () => {
    memoryConnection.bullets.push({ ...BULLET(), schedule_id: 1 });
    memoryConnection.users.push(USER("1"));
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleAppointmentInput = {
      user_id: 1,
      medical_id: 1,
      animal_id: 1,
      bullet_code: "2023-08-08T16:00",
    };

    const exception = {
      name: "TIME_OR_DATE_EXCEPTION",
      message: "Time or Date not available to schedule",
      status: 409,
    };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(TimeOrDateException);
  });

  test("Dont should create usecase schedule appointment with medical inexistent", async () => {
    memoryConnection.users.push(USER("1"));
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.bullets.push(BULLET());
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleAppointmentInput = {
      user_id: 1,
      medical_id: 2,
      animal_id: 1,
      bullet_code: "2023-08-08T16:00",
    };

    const exception = { name: "MEDICAL_EXCEPTION", message: "Medical not found", status: 404 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(MedicalException);
  });

  test("Dont should create second usecase schedule appointment with medical equals", async () => {
    memoryConnection.users.push(USER("1"));
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.bullets.push(BULLET(), { ...BULLET(), bullet_id: 2 });
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleAppointmentInput = {
      user_id: 1,
      medical_id: 1,
      animal_id: 1,
      bullet_code: "2023-08-08T16:00",
    };

    await usecase.execute(input);

    const exception = {
      name: "MEDICAL_BUSY_EXCEPTION",
      message: "Medical is not available at this is time",
      status: 404,
    };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(MedicalBusyException);
  });

  test("Dont should create usecase schedule appointment with user inexistent", async () => {
    memoryConnection.animals.push(ANIMAL(1));
    memoryConnection.bullets.push(BULLET());
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleAppointmentInput = {
      user_id: 999,
      medical_id: 1,
      animal_id: 1,
      bullet_code: "2023-08-08T16:00",
    };

    const exception = { name: "USER_EXCEPTION", message: "User is invalid", status: 400 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(UserException);
  });

  test("Dont should create usecase schedule appointment with animal inexistent", async () => {
    memoryConnection.users.push(USER("1"));
    memoryConnection.bullets.push(BULLET());
    memoryConnection.medicals.push(MEDICAL());

    const input: ScheduleAppointmentInput = {
      user_id: 1,
      medical_id: 1,
      animal_id: 888,
      bullet_code: "2023-08-08T16:00",
    };

    const exception = { name: "ANIMAL_EXCEPTION", message: "Animal doesn't belong to the user", status: 404 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(AnimalException);
  });
});
