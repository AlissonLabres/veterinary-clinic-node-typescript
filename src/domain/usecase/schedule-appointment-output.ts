export default class ScheduleAppointmentOutput {
  constructor(
    public schedule_id: number,
    public schedule_status: string,
    public type_service: string
  ) { }
}