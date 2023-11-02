import User from "../../../src/domain/entity/user";
import MedicalBusyException from "../../../src/domain/exception/medical-busy-exception";
import MedicalException from "../../../src/domain/exception/medical-exception";
import TimeOrDateException from "../../../src/domain/exception/time-or-date-exception";
import CreateScheduleAppointment from "../../../src/domain/usecase/schedule/create-schedule-appointment/create-schedule-appointment"
import ScheduleAppointmentInput from "../../../src/domain/usecase/schedule/create-schedule-appointment/schedule-appointment-input";
import ScheduleAppointmentOutput from "../../../src/domain/usecase/schedule/create-schedule-appointment/schedule-appointment-output";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import MedicalRepositoryMemory from "../../../src/infrastructure/repository/medical/medica-repository-memory";
import ScheduleRepositoryMemory from "../../../src/infrastructure/repository/schedule/schedule-repository-memory"
import UserRepositoryMemory from "../../../src/infrastructure/repository/user/user-repository-memory";

let usecase: CreateScheduleAppointment;
let user_id: number;

describe('Test integration create schedule appointment', () => {
  beforeEach(async () => {
    const memoryConnection = new MemoryConnection();
    const userRepository = new UserRepositoryMemory(memoryConnection);
    const user = await userRepository.create(
      User.create({
        user_name: 'Name Testing',
        user_email: 'email@testing.com.br',
        user_phone: '(41) 98888-2222'
      })
    );

    user_id = user.user_id!;
    const medicalRepository = new MedicalRepositoryMemory(memoryConnection);
    const scheduleRepository = new ScheduleRepositoryMemory(memoryConnection);
    usecase = new CreateScheduleAppointment(scheduleRepository, medicalRepository, userRepository);
  });

  test('Should create usecase schedule appointment', async () => {
    const input: ScheduleAppointmentInput = {
      user_id: user_id!,
      medical_id: 1,
      animal_id: 1,
      bullet_code: '2023-08-08T16:00'
    };

    const output: ScheduleAppointmentOutput = await usecase.execute(input);

    expect(output.schedule_id).toBeDefined();
    expect(output.schedule_status).toEqual('SCHEDULED');
    expect(output.type_service).toEqual('APPOINTMENT');
  })

  test('Don`t should create usecase schedule appointment with bullet not available', async () => {
    const input: ScheduleAppointmentInput = {
      user_id: user_id!,
      medical_id: 1,
      animal_id: 1,
      bullet_code: '2023-08-08T18:00'
    };

    const exception = { name: 'TIME_OR_DATE_EXCEPTION', message: 'Time or Date not available to schedule', status: 409 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(TimeOrDateException);
  })

  test('Don`t should create usecase schedule appointment with medical inexistent', async () => {
    const input: ScheduleAppointmentInput = {
      user_id: user_id!,
      medical_id: 2,
      animal_id: 1,
      bullet_code: '2023-08-08T16:00'
    };

    const exception = { name: 'MEDICAL_EXCEPTION', message: 'Medical not found', status: 404 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(MedicalException);
  })

  test('Don`t should create second usecase schedule appointment with medical equals', async () => {
    const input: ScheduleAppointmentInput = {
      user_id: user_id!,
      medical_id: 1,
      animal_id: 1,
      bullet_code: '2023-08-08T16:00'
    };

    await usecase.execute(input);

    const exception = { name: 'MEDICAL_BUSY_EXCEPTION', message: 'Medical is not available at this is time', status: 404 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(MedicalBusyException);
  })
});