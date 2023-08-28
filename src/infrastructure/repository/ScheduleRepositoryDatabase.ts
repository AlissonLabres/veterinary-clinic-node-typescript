import Bullet from "../../domain/entity/bullet";
import Schedule from "../../domain/entity/schedule";
import ScheduleRepository from "../../domain/repository/schedule-repository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ScheduleRepositoryDatabase implements ScheduleRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) { }

  async createAppointment(schedule: Schedule): Promise<number> {
    const [{ schedule_id }] = await this.databaseConnection.query(
      "insert into schedule(schedule_status, user_id, medical_id, animal_id, bullet_id, type_service) values ($1, $2, $3, $4, $5, $6) RETURNING schedule_id",
      ['SCHEDULED', schedule.user_id, schedule.medical_id, schedule.animal_id, schedule.bullet_id, 'APPOINTMENT']
    );

    return schedule_id;
  }

  async getBulletByCode(code: string): Promise<Bullet> {
    const [bulletData] = await this.databaseConnection.query("select * from bullet where bullet_code = $1", [code]);
    return Bullet.restore(bulletData);
  }
}