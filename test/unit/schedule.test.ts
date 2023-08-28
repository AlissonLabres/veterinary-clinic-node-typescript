import Schedule from "../../src/domain/entity/schedule"

test('Should create schedule', () => {
  const input = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_id: 1
  };

  const schedule = Schedule.create(input.user_id, input.medical_id, input.animal_id, input.bullet_id);
  expect(schedule.schedule_status).toEqual("SCHEDULED");
  expect(schedule.type_service).toEqual("APPOINTMENT");
})