export default class AllScheduleOutput {

  constructor(
    public schedule_id: number,
    public schedule_status: string,
    public type_service: string,
    public bullet_code: string
  ) { }

}