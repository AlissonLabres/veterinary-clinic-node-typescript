import axios, { AxiosError } from "axios";

test("Should cancel schedule", async () => {
  const create = {
    user_id: 1,
    medical_id: 1,
    animal_id: 1,
    bullet_code: '2023-09-03T16:00'
  };

  const { data } = await axios.post("http://localhost:3000/schedule/appointment", create);

  const input = { schedule_id: data.schedule_id };
  const response = await axios.post("http://localhost:3000/schedule/appointment/cancel", input);
  
  expect(response.status).toEqual(204)
});


test("Should receive error when cancel schedule_id not created", async () => {
  const input = { schedule_id: 500 };
  await expect(() => axios.post("http://localhost:3000/schedule/appointment/cancel", input)).rejects.toBeInstanceOf(AxiosError);
});