import Bullet from "../../../entity/bullet";
import Medical from "../../../entity/medical";
import Schedule from "../../../entity/schedule";
import User from "../../../entity/user";
import AnimalException from "../../../exception/animal-exception";
import MedicalRepository from "../../../repository/medical-repository";
import ScheduleRepository from "../../../repository/schedule-repository";
import UserRepository from "../../../repository/user-repository";
import ScheduleUrgentInput from "./schedule-urgent-input";
import ScheduleUrgentOutput from "./schedule-urgent-output";

export default class CreateScheduleUrgent {

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly medicalRepository: MedicalRepository,
    private readonly userRepository: UserRepository
  ) { }

  async execute(input: ScheduleUrgentInput): Promise<ScheduleUrgentOutput> {
    const user: User = await this.userRepository.getUserAndAnimalsById(input.user_id, input.animal_id);
    if (!user.user_animals.includes(input.animal_id)) {
      throw new AnimalException("Animal doesn't belong to the user");
    }

    const bullet: Bullet = await this.scheduleRepository.getNearestBullet(input.urgency_date);
    const medical: Medical = await this.medicalRepository.availableUrgentTo(bullet.bullet_code);
    const schedule = Schedule.create(user.user_id!, medical.medical_id!, input.animal_id, bullet.bullet_id, 'URGENT');
    const id_schedule: number = await this.scheduleRepository.createSchedule(schedule);

    return {
      schedule_id: id_schedule,
      schedule_status: schedule.schedule_status,
      type_service: schedule.type_service.value,
      bullet_code: bullet.bullet_code
    };
  }
}