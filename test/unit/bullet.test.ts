import Bullet from "../../src/domain/entity/bullet";
import TimeOrDateException from "../../src/domain/exception/time-or-date-exception";

test('Should restore bullet', () => {
  const input = {
    bullet_code: '2023-08-08T16:00',
    bullet_id: 1,
    schedule_id: 1,
  };

  const bullet = Bullet.restore(input);
  expect(bullet.bullet_code).toEqual("2023-08-08T16:00");
})

test('Should receive error TimeOrDateException when restore bullet with bullet_id inexistent', () => {
  const input = { };

  expect(() => Bullet.restore(input)).toThrow(TimeOrDateException);
})
