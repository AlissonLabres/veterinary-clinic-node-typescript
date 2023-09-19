import ScheduleRepository from "../../domain/repository/schedule-repository";
import CancelScheduleAppointment from "../../domain/usecase/cancel-schedule-appointment/cancel-schedule-appoitment";
import CreateScheduleAppointment from "../../domain/usecase/create-schedule-appointment/create-schedule-appointment";
import CreateScheduleUrgent from "../../domain/usecase/create-schedule-urgent/create-schedule-urgent";
import GetBullets from "../../domain/usecase/get-bullets/get-bullets";

export default class UsecaseFactory {

  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  createScheduleAppointment: CreateScheduleAppointment = new CreateScheduleAppointment(this.scheduleRepository);
  createScheduleUrgent: CreateScheduleUrgent = new CreateScheduleUrgent(this.scheduleRepository);
  cancelScheduleAppointment: CancelScheduleAppointment = new CancelScheduleAppointment(this.scheduleRepository);
  getBullets: GetBullets = new GetBullets(this.scheduleRepository);
}