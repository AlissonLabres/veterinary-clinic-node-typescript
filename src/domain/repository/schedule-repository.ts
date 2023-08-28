import Bullet from "../entity/bullet";
import Schedule from "../entity/schedule";

export default interface ScheduleRepository {
  createAppointment(schedule: Schedule): Promise<number>;

  getBulletByCode(code: string): Promise<Bullet>;
}