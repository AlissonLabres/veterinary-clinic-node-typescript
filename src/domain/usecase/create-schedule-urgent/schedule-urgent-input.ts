export default class ScheduleUrgentInput {
  constructor(
    public user_id: number,
    public medical_id: number,
    public animal_id: number,
    public urgency_date: string
  ) { }
}