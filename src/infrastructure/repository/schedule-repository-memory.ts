import crypto from "crypto";
import Schedule from "../../domain/entity/schedule";
import ScheduleRepository from "../../domain/repository/schedule-repository";
import Bullet from "../../domain/entity/bullet";

export default class ScheduleRepositoryMemory implements ScheduleRepository {
  private bullets: any[] = [];
  private schedules: {
    user_id: number,
    medical_id: number,
    animal_id: number,
    schedule_status: string,
    bullet_id: number | undefined,
    type_service: 'APPOINTMENT' | 'URGENT',
    schedule_id?: number,
  }[] = [];

  constructor() {
    this.schedules = [];
    this.bullets = [];

    this.bullets.push(
      { bullet_code: '2023-08-08T16:00', bullet_id: 1 },
      { bullet_code: '2023-09-08T16:00', bullet_id: 2 },
      { bullet_code: '2023-09-03T16:00', bullet_id: 3 }
    )
  }
  
  createSchedule(schedule: Schedule): Promise<number> {
    schedule.schedule_id = crypto.randomInt(30);
    this.schedules.push({
      user_id: schedule.user_id,
      medical_id: schedule.medical_id,
      animal_id: schedule.animal_id,
      bullet_id: schedule.bullet_id,
      schedule_status: schedule.schedule_status,
      type_service: schedule.type_service.value,
      schedule_id: schedule.schedule_id,
    });

    this.bullets = this.bullets.map((bullet) => {
      if (bullet.bullet_id === schedule.bullet_id) {
        bullet.schedule_id = schedule.schedule_id;
      }

      return bullet;
    })

    return Promise.resolve(schedule.schedule_id);
  }

  async getSchedule(schedule_id: number): Promise<Schedule> {
    try {
      const scheduleData = this.schedules.find(schedule => schedule.schedule_id === schedule_id);
      const schedule = Schedule.restore(scheduleData);

      return Promise.resolve(schedule);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async cancelSchedule(schedule: Schedule): Promise<void> {
    this.schedules = this.schedules.map(scheduleData => {
      if (scheduleData.schedule_id === schedule.schedule_id) {
        scheduleData.schedule_status = schedule.schedule_status;
        scheduleData.bullet_id = undefined;
      }

      return scheduleData
    });

    this.bullets = this.bullets.map((bullet) => {
      if (bullet.bullet_id === schedule.bullet_id) {
        bullet.schedule_id = undefined;
      }

      return bullet;
    })
  }

  getBulletByCode(code: string): Promise<Bullet> {
    try {
      const bulletData = this.bullets.find(bullet => bullet.bullet_code === code && !bullet.schedule_id);
      return Promise.resolve(Bullet.restore(bulletData));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getNearestBullet(urgency_date: string): Promise<Bullet> {
    try {
      const bulletsSort = this.bullets.sort((bulletA, bulletB) => new Date(bulletA.bullet_code).getTime() - new Date(bulletB.bullet_code).getTime());
      const bulletData = bulletsSort.find((bullet) => new Date(urgency_date).getTime() < new Date(bullet.bullet_code).getTime())
  
      return Promise.resolve(Bullet.restore(bulletData));
    } catch (error) {
      return Promise.reject(error);
    }
  }

}