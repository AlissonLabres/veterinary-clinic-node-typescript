import Bullet from "../../entity/bullet";
import Medical from "../../entity/medical";
import Schedule from "../../entity/schedule";
import MedicalBusyException from "../../exception/medical-busy-exception";
import MedicalRepository from "../../repository/medical-repository";
import ScheduleRepository from "../../repository/schedule-repository";
import ScheduleUrgentInput from "./schedule-urgent-input";
import ScheduleUrgentOutput from "./schedule-urgent-output";

export default class CreateScheduleUrgent {

  constructor(private readonly scheduleRepository: ScheduleRepository, private readonly medicalRepository: MedicalRepository) { }

  async execute(input: ScheduleUrgentInput): Promise<ScheduleUrgentOutput> {
    const bullet: Bullet = await this.scheduleRepository.getNearestBullet(input.urgency_date);
    const medical: Medical = await this.medicalRepository.availableUrgentTo(bullet.bullet_code);
    const schedule = Schedule.create(input.user_id, medical.medical_id!, input.animal_id, bullet.bullet_id, 'URGENT');
    const id_schedule: number = await this.scheduleRepository.createSchedule(schedule);

    return {
      schedule_id: id_schedule,
      schedule_status: schedule.schedule_status,
      type_service: schedule.type_service.value,
      bullet_code: bullet.bullet_code
    };
  }
}