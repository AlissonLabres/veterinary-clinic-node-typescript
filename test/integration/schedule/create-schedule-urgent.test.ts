import Animal from "../../../src/domain/entity/animal";
import User from "../../../src/domain/entity/user";
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

describe('Test integration create schedule urgent', () => {
  let usecase: CreateScheduleUrgent;
  let user_id: number;
  let animal_id: number;

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

    const animal = await userRepository.createAnimal(
      user.user_id!,
      Animal.create({
        animal_name: 'Animal Name',
        animal_age: 10,
        animal_weight: 10,
        animal_type: 'DOG',
        animal_breed: 'Breed'
      })
    );

    const medicalRepository = new MedicalRepositoryMemory(memoryConnection);
    const scheduleRepository = new ScheduleRepositoryMemory(memoryConnection);
    usecase = new CreateScheduleUrgent(scheduleRepository, medicalRepository, userRepository);
    user_id = user.user_id!;
    animal_id = animal.animal_id!;
  });
  
  test('Should create usecase schedule urgent', async () => {
    const input: ScheduleUrgentInput = {
      user_id,
      animal_id,
      urgency_date: '2023-08-05T10:00'
    };
  
    const output: ScheduleUrgentOutput = await usecase.execute(input);
  
    expect(output.schedule_id).toBeDefined();
    expect(output.schedule_status).toEqual('SCHEDULED');
    expect(output.type_service).toEqual('URGENT');
  
  })
  
  test('Don`t should create usecase schedule urgent with bullet not available', async () => {
    const input: ScheduleUrgentInput = {
      user_id,
      animal_id,
      urgency_date: '2023-10-08T18:00'
    };
  
    const exception = { name: 'TIME_OR_DATE_EXCEPTION', message: 'Time or Date not available to schedule', status: 409 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(TimeOrDateException);
  })
  
  test('Don`t should create usecase schedule urgent without medical available', async () => {
    const input: ScheduleUrgentInput = {
      user_id,
      animal_id,
      urgency_date: '2023-08-05T10:00'
    };
  
    await usecase.execute(input);
  
    const exception = { name: 'MEDICAL_EXCEPTION', message: 'Medical not found', status: 404 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(MedicalException);
  })
  
  test('Don`t should create usecase schedule urgent without user create', async () => {
    const input: ScheduleUrgentInput = {
      user_id: 999,
      animal_id,
      urgency_date: '2023-08-05T10:00'
    };
  
    const exception = { name: 'USER_EXCEPTION', message: 'User is invalid', status: 400 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(UserException);
  })

  test('Don`t should create usecase schedule urgent without animal create', async () => {
    const input: ScheduleUrgentInput = {
      user_id,
      animal_id: 999,
      urgency_date: '2023-08-05T10:00'
    };
  
    const exception = { name: 'ANIMAL_EXCEPTION', message: "Animal doesn't belong to the user", status: 404 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
    await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(AnimalException);
  })
});