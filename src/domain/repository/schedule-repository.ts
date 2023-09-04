import Bullet from "../entity/bullet";
import Schedule from "../entity/schedule";

export default interface ScheduleRepository {
  createSchedule(schedule: Schedule): Promise<number>;

  cancelSchedule(schedule: Schedule): Promise<void>;

  getSchedule(id: number): Promise<Schedule>;

  getBulletByCode(code: string): Promise<Bullet>;

  getNearestBullet(urgency_date: string): Promise<Bullet>;

  getBullets(): Promise<Bullet[]>;
}