import crypto from "crypto";
import Schedule from "../../domain/entity/schedule";
import ScheduleRepository from "../../domain/repository/schedule-repository";
import Bullet from "../../domain/entity/bullet";

export default class ScheduleRepositoryMemory implements ScheduleRepository {
  private bullets: any[] = [];
  private schedules: Schedule[] = [];

  constructor() {
    this.bullets.push(
      { bullet_code: '2023-08-08T16:00', bullet_id: 1 },
      { bullet_code: '2023-09-08T16:00', bullet_id: 2 },
      { bullet_code: '2023-09-03T16:00', bullet_id: 3 }
    )
  }
  
  createSchedule(schedule: Schedule): Promise<number> {
    schedule.schedule_id = crypto.randomInt(30);
    this.schedules.push(schedule);

    return Promise.resolve(schedule.schedule_id);
  }

  getBulletByCode(code: string): Promise<Bullet> {
    const bulletData = this.bullets.find(bullet => bullet.bullet_code === code);
    return Promise.resolve(Bullet.restore(bulletData));
  }

  getNearestBullet(urgency_date: string): Promise<Bullet> {
    const bulletsSort = this.bullets.sort((bulletA, bulletB) => new Date(bulletA.bullet_code).getTime() - new Date(bulletB.bullet_code).getTime());
    const bulletData = bulletsSort.find((bullet) => new Date(urgency_date).getTime() < new Date(bullet.bullet_code).getTime())

    return Promise.resolve(Bullet.restore(bulletData));
  }

}