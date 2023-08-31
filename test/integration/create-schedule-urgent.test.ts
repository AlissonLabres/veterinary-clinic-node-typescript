import axios from "axios";

test("Should create schedule", async () => {
  const input = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    urgency_date: '2023-08-05T10:00'
  };

  const response = await axios.post("http://localhost:3000/schedule/urgent", input);

  expect(response.data.schedule_id).toBeDefined();
  expect(response.data.schedule_status).toEqual("SCHEDULED");
  expect(response.data.type_service).toEqual("URGENT"); 
});

test("Should select bullet not available and receive error in create schedule", async () => {
  const input = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_code: '2023-08-08T18:00'
  };

  try {
    await axios.post("http://localhost:3000/schedule/appointment", input)
  } catch (error: any) {
    const response = error.response.data;

    expect(response.status).toEqual(409)
    expect(response.message).toEqual("Time or Date not available to schedule")
    expect(response.name).toEqual("TIME_OR_DATE_EXCEPTION")
  }
});

