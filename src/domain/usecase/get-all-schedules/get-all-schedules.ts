import ScheduleRepository from "../../repository/schedule-repository";
import AllScheduleOutput from "./all-schedule-output";

export default class GetAllSchedules {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(user_id: number): Promise<AllScheduleOutput[]> {
    const schedules = await this.scheduleRepository.getAllSchedules(user_id);
    const output: AllScheduleOutput[] = [];

    for (const schedule of schedules) {
      const bullet = await this.scheduleRepository.getBulletById(schedule.bullet_id);
      output.push({
        schedule_id: schedule.schedule_id!,
        schedule_status: schedule.schedule_status,
        type_service: schedule.type_service.value,
        bullet_code: bullet.bullet_code
      });
    }

    return output;
  }
}