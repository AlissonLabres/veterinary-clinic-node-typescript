import Schedule from "../../src/domain/entity/schedule"
import ScheduleException from "../../src/domain/exception/schedule-exception";

test('Should create schedule appointment', () => {
  const input = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_id: 1
  };

  const schedule = Schedule.create(input.user_id, input.medical_id, input.animal_id, input.bullet_id);
  expect(schedule.schedule_status).toEqual("SCHEDULED");
  expect(schedule.type_service.value).toEqual("APPOINTMENT");
})

test('Should create schedule urgent', () => {
  const input = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_id: 1
  };

  const schedule = Schedule.create(input.user_id, input.medical_id, input.animal_id, input.bullet_id, 'URGENT');
  expect(schedule.schedule_status).toEqual("SCHEDULED");
  expect(schedule.type_service.value).toEqual("URGENT");
})

test('Should cancel schedule appointment', () => {
  const input = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_id: 1
  };

  const schedule = Schedule.create(input.user_id, input.medical_id, input.animal_id, input.bullet_id);
  schedule.cancel();

  expect(schedule.schedule_status).toEqual("CANCELED");
})

test('Should restore schedule', () => {
  const input = {
    schedule_id: 1,
    schedule_status: 'SCHEDULED',
    type_service: 'APPOINTMENT',
  };

  const schedule = Schedule.restore(input);
  expect(schedule.schedule_status).toEqual("SCHEDULED");
})

test('Should receive error ScheduleException when restore schedule with schedule_id inexistent', () => {
  const input = { type_service: 'APPOINTMENT' };

  expect(() => Schedule.restore(input)).toThrow(ScheduleException);
})
