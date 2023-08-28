export default class ScheduleAppointmentInput {
  constructor(
    public user_id: number,
    public medical_id: number,
    public animal_id: number,
    public bullet_code: string
  ) { }
}