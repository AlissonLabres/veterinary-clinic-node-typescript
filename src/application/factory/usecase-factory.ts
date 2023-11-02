import MedicalRepository from "../../domain/repository/medical-repository";
import ScheduleRepository from "../../domain/repository/schedule-repository";
import UserRepository from "../../domain/repository/user-repository";
import CancelScheduleAppointment from "../../domain/usecase/cancel-schedule-appointment/cancel-schedule-appoitment";
import CreateScheduleAppointment from "../../domain/usecase/create-schedule-appointment/create-schedule-appointment";
import CreateScheduleUrgent from "../../domain/usecase/create-schedule-urgent/create-schedule-urgent";
import CreateUser from "../../domain/usecase/user/create-user/create-user";
import GetAllSchedules from "../../domain/usecase/get-all-schedules/get-all-schedules";
import GetBullets from "../../domain/usecase/get-bullets/get-bullets";
import getMedicalsBySpeciality from "../../domain/usecase/get-medical-by-speciality/get-medical-by-speciality";

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