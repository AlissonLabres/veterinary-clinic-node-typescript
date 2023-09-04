import axios, { AxiosError } from "axios";

test("Should create schedule", async () => {
  const mockBullets = [
    { id: 1, code: '2023-08-08T16:00' },
    { id: 2, code: '2023-09-08T16:00' },
    { id: 3, code: '2023-09-03T16:00' }
  ]
  const response = await axios.get("http://localhost:3000/bullets");

  expect(response.data.bullets).toBeDefined();
  expect(response.data.bullets).toEqual(mockBullets);
});
