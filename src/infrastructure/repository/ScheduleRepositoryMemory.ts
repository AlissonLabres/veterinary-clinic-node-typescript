import crypto from "crypto";
import Schedule from "../../domain/entity/schedule";
import ScheduleRepository from "../../domain/repository/schedule-repository";
import Bullet from "../../domain/entity/bullet";

export default class ScheduleRepositoryMemory implements ScheduleRepository {
  private bullets: any[] = [];
  private schedules: Schedule[] = [];

  constructor() {
    this.bullets.push({ bullet_code: '2023-08-08T16:00', bullet_id: 1 })
  }
  
  createAppointment(schedule: Schedule): Promise<number> {
    schedule.schedule_id = crypto.randomInt(30);
    this.schedules.push(schedule);

    return Promise.resolve(schedule.schedule_id);
  }

  getBulletByCode(code: string): Promise<Bullet> {
    const bulletData = this.bullets.find(bullet => bullet.bullet_code === code);
    return Promise.resolve(Bullet.restore(bulletData));
  }
}