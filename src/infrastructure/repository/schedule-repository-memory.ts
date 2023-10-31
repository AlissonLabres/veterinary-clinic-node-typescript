import crypto from "crypto";
import Schedule from "../../domain/entity/schedule";
import ScheduleRepository from "../../domain/repository/schedule-repository";
import Bullet from "../../domain/entity/bullet";
import MemoryConnection from "./database/memory-connection";

export default class ScheduleRepositoryMemory implements ScheduleRepository {

  constructor(private readonly memoryConnection: MemoryConnection) { }
  
  createSchedule(schedule: Schedule): Promise<number> {
    schedule.schedule_id = crypto.randomInt(30);
    this.memoryConnection.schedules.push({
      user_id: schedule.user_id,
      medical_id: schedule.medical_id,
      animal_id: schedule.animal_id,
      bullet_id: schedule.bullet_id,
      schedule_status: schedule.schedule_status,
      type_service: schedule.type_service.value,
      schedule_id: schedule.schedule_id,
    });

    this.memoryConnection.bullets = this.memoryConnection.bullets.map((bullet) => {
      if (bullet.bullet_id === schedule.bullet_id) {
        bullet.schedule_id = schedule.schedule_id;
      }

      return bullet;
    })

    return Promise.resolve(schedule.schedule_id);
  }

  async getSchedule(schedule_id: number): Promise<Schedule> {
    try {
      const scheduleData = this.memoryConnection.schedules.find(schedule => schedule.schedule_id === schedule_id);
      const schedule = Schedule.restore(scheduleData);

      return Promise.resolve(schedule);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async cancelSchedule(schedule: Schedule): Promise<void> {
    this.memoryConnection.schedules = this.memoryConnection.schedules.map(scheduleData => {
      if (scheduleData.schedule_id === schedule.schedule_id) {
        scheduleData.schedule_status = schedule.schedule_status;
        scheduleData.bullet_id = undefined;
      }

      return scheduleData
    });

    this.memoryConnection.bullets = this.memoryConnection.bullets.map((bullet) => {
      if (bullet.bullet_id === schedule.bullet_id) {
        bullet.schedule_id = undefined;
      }

      return bullet;
    })
  }

  getBulletById(id: number): Promise<Bullet> {
    try {
      const bulletData = this.memoryConnection.bullets.find(bullet => bullet.bullet_id === id);
      return Promise.resolve(Bullet.restore(bulletData));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getBulletByCode(code: string): Promise<Bullet> {
    try {
      const bulletData = this.memoryConnection.bullets.find(bullet => bullet.bullet_code === code && !bullet.schedule_id);
      return Promise.resolve(Bullet.restore(bulletData));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getNearestBullet(urgency_date: string): Promise<Bullet> {
    try {
      const bulletsSort = this.memoryConnection.bullets
        .filter(bullet => !bullet.schedule_id)
        .sort((bulletA, bulletB) => new Date(bulletA.bullet_code).getTime() - new Date(bulletB.bullet_code).getTime());

      const bulletData = bulletsSort.find((bullet) => new Date(urgency_date).getTime() < new Date(bullet.bullet_code).getTime())
  
      return Promise.resolve(Bullet.restore(bulletData));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getBullets(): Promise<Bullet[]> {
    const bulletsData = this.memoryConnection.bullets.filter(bullet => !bullet.schedule_id);
    const bullets: Bullet[] = [];

    for (const bulletData of bulletsData) {
      bullets.push(Bullet.restore(bulletData));
    }

    return Promise.resolve(bullets);
  }

  getAllSchedules(user_id: number): Promise<Schedule[]> {
    try {
      const schedulesData = this.memoryConnection.schedules.filter(schedule => schedule.user_id === user_id);
      const schedules: Schedule[] = [];

      for (const scheduleData of schedulesData) {
        schedules.push(Schedule.restore(scheduleData));
      }

      return Promise.resolve(schedules);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}