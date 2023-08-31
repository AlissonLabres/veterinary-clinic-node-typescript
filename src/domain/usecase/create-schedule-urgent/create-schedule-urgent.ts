import Bullet from "../../entity/bullet";
import Schedule from "../../entity/schedule";
import ScheduleRepository from "../../repository/schedule-repository";
import ScheduleUrgentInput from "./schedule-urgent-input";
import ScheduleUrgentOutput from "./schedule-urgent-output";

export default class CreateScheduleUrgent {

  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(input: ScheduleUrgentInput): Promise<ScheduleUrgentOutput> {
    const bullet: Bullet = await this.scheduleRepository.getNearestBullet(input.urgency_date);

    const schedule = Schedule.create(input.user_id, input.medical_id, input.animal_id, bullet.bullet_id, 'URGENT');
    const id_schedule: number = await this.scheduleRepository.createSchedule(schedule);

    return {
      schedule_id: id_schedule,
      schedule_status: schedule.schedule_status,
      type_service: schedule.type_service.value,
      bullet_code: bullet.bullet_code
    };
  }
}