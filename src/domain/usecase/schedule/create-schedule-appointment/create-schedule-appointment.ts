import Bullet from "../../../entity/bullet";
import Medical from "../../../entity/medical";
import Schedule from "../../../entity/schedule";
import User from "../../../entity/user";
import AnimalException from "../../../exception/animal-exception";
import MedicalBusyException from "../../../exception/medical-busy-exception";
import MedicalRepository from "../../../repository/medical-repository";
import ScheduleRepository from "../../../repository/schedule-repository";
import UserRepository from "../../../repository/user-repository";
import ScheduleAppointmentInput from "./schedule-appointment-input";
import ScheduleAppointmentOutput from "./schedule-appointment-output";

export default class CreateScheduleAppointment {

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly medicalRepository: MedicalRepository,
    private readonly userRepository: UserRepository
  ) { }

  async execute(input: ScheduleAppointmentInput): Promise<ScheduleAppointmentOutput> {
    const user: User = await this.userRepository.getUserAndAnimalsById(input.user_id, input.animal_id);
    if (!user.user_animals?.includes(input.animal_id)) {
      throw new AnimalException("Animal doesn't belong to the user");
    }

    const bullet: Bullet = await this.scheduleRepository.getBulletByCode(input.bullet_code);
    const medical: Medical = await this.medicalRepository.getMedicalById(input.medical_id);

    const available = await this.medicalRepository.availableTo(bullet.bullet_code, medical.medical_id!);
    if (!available) {
      throw new MedicalBusyException();
    }

    const schedule = Schedule.create(user.user_id!, medical.medical_id!, input.animal_id, bullet.bullet_id);
    const id_schedule: number = await this.scheduleRepository.createSchedule(schedule);

    return {
      schedule_id: id_schedule,
      schedule_status: schedule.schedule_status,
      type_service: schedule.type_service.value
    };
  }
}