import axios, { AxiosError } from "axios";

test("Should create schedule", async () => {
  const input = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_code: '2023-08-08T16:00'
  };

  const response = await axios.post("http://localhost:3000/schedule/appointment", input);

  expect(response.data.schedule_id).toBeDefined();
  expect(response.data.schedule_status).toEqual("SCHEDULED");
  expect(response.data.type_service).toEqual("APPOINTMENT"); 
});

test("Should select bullet not available and receive error in create schedule", async () => {
  const input = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_code: '2023-08-08T18:00'
  };

  await expect(() => axios.post("http://localhost:3000/schedule/appointment", input)).rejects.toBeInstanceOf(AxiosError);
});

