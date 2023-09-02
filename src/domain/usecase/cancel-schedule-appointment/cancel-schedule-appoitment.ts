import Schedule from "../../entity/schedule";
import ScheduleRepository from "../../repository/schedule-repository";

export default class CancelScheduleAppointment {

  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async execute(schedule_id: number) {
    const schedule: Schedule = await this.scheduleRepository.getSchedule(schedule_id);
    schedule.cancel();

    await this.scheduleRepository.cancelSchedule(schedule);
  }

}