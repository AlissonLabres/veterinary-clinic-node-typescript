import Bullet from "../../domain/entity/bullet";
import Schedule from "../../domain/entity/schedule";
import ScheduleRepository from "../../domain/repository/schedule-repository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ScheduleRepositoryDatabase implements ScheduleRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) { }

  async createSchedule(schedule: Schedule): Promise<number> {
    const [{ schedule_id }] = await this.databaseConnection.query(
      "insert into schedule(schedule_status, user_id, medical_id, animal_id, bullet_id, type_service) values ($1, $2, $3, $4, $5, $6) RETURNING schedule_id",
      ['SCHEDULED', schedule.user_id, schedule.medical_id, schedule.animal_id, schedule.bullet_id, 'APPOINTMENT']
    );

    await this.databaseConnection.query(
      "UPDATE bullet SET schedule_id = $1 WHERE bullet.bullet_id = $2",
      [schedule_id, schedule.bullet_id]
    );

    return schedule_id;
  }

  async getSchedule(schedule_id: number): Promise<Schedule> {
    const [scheduleData] = await this.databaseConnection.query("select * from schedule where schedule_id = $1", [schedule_id]);
    return Schedule.restore(scheduleData);
  }

  async cancelSchedule(schedule: Schedule): Promise<void> {
    await this.databaseConnection.query(
      "update schedule set schedule_status = $1 where schedule.schedule_id = $2",
      [schedule.schedule_status, schedule.schedule_id]
    );

    await this.databaseConnection.query(
      "UPDATE bullet SET schedule_id = $1 WHERE bullet.bullet_id = $2",
      [null, schedule.bullet_id]
    );
  }

  async getBulletByCode(code: string): Promise<Bullet> {
    const [bulletData] = await this.databaseConnection.query("select * from bullet where bullet_code = $1 and schedule_id is null", [code]);
    return Bullet.restore(bulletData);
  }

  async getNearestBullet(urgency_date: string): Promise<Bullet> {
    const [bulletData] = await this.databaseConnection.query("select * from bullet where bullet_code >= $1 order by bullet_code asc", [urgency_date]);
    return Bullet.restore(bulletData);
  }

}