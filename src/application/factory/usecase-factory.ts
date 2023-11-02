import MedicalRepository from "../../domain/repository/medical-repository";
import ScheduleRepository from "../../domain/repository/schedule-repository";
import UserRepository from "../../domain/repository/user-repository";
import CancelScheduleAppointment from "../../domain/usecase/schedule/cancel-schedule-appointment/cancel-schedule-appoitment";
import CreateScheduleAppointment from "../../domain/usecase/schedule/create-schedule-appointment/create-schedule-appointment";
import CreateScheduleUrgent from "../../domain/usecase/schedule/create-schedule-urgent/create-schedule-urgent";
import CreateUser from "../../domain/usecase/user/create-user/create-user";
import GetAllSchedules from "../../domain/usecase/schedule/get-all-schedules/get-all-schedules";
import GetBullets from "../../domain/usecase/bullets/get-bullets/get-bullets";
import getMedicalsBySpeciality from "../../domain/usecase/medical/get-medical-by-speciality/get-medical-by-speciality";

export default class UsecaseFactory {

  constructor(
    private readonly scheduleRepository: ScheduleRepository,
    private readonly medicalRepository: MedicalRepository,
    private readonly userRepository: UserRepository
  ) { }

  createScheduleAppointment: CreateScheduleAppointment = new CreateScheduleAppointment(this.scheduleRepository, this.medicalRepository);
  createScheduleUrgent: CreateScheduleUrgent = new CreateScheduleUrgent(this.scheduleRepository, this.medicalRepository);
  cancelScheduleAppointment: CancelScheduleAppointment = new CancelScheduleAppointment(this.scheduleRepository);
  getBullets: GetBullets = new GetBullets(this.scheduleRepository);
  getAllSchedules: GetAllSchedules = new GetAllSchedules(this.scheduleRepository);
  
  getMedicalsBySpeciality: getMedicalsBySpeciality = new getMedicalsBySpeciality(this.medicalRepository);
  
  createUser: CreateUser = new CreateUser(this.userRepository);
}