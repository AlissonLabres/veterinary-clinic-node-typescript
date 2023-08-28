import Bullet from "../entity/bullet";
import Schedule from "../entity/schedule";
import TimeOrDateException from "../exception/time-or-date-exception";
import ScheduleRepository from "../repository/schedule-repository";
import ScheduleAppointmentInput from "./schedule-appointment-input";
import ScheduleAppointmentOutput from "./schedule-appointment-output";

export default class CreateScheduleAppointment {

  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(input: ScheduleAppointmentInput): Promise<ScheduleAppointmentOutput> {
    const bullet: Bullet = await this.scheduleRepository.getBulletByCode(input.bullet_code);
    const schedule = Schedule.create(input.user_id, input.medical_id, input.animal_id, bullet.bullet_id);
    const id_schedule: number = await this.scheduleRepository.createAppointment(schedule);

    return {
      schedule_id: id_schedule,
      schedule_status: schedule.schedule_status!,
      type_service: schedule.type_service!
    };
  }
}