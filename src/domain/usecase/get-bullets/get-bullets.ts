import Bullet from "../../entity/bullet";
import ScheduleRepository from "../../repository/schedule-repository";
import BulletOutput from "./get-bullet-output";

export default class GetBullets {

  constructor(private readonly scheduleRepository: ScheduleRepository) { }
  
  async execute() {
    const bullets: Bullet[] = await this.scheduleRepository.getBullets();
    const output: BulletOutput[] = [];

    for (const bullet of bullets) {
      output.push(
        new BulletOutput(bullet.bullet_id, bullet.bullet_code)
      );
    }

    return output;
  }
}