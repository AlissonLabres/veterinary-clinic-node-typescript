export default class Schedule {
  public schedule_id: number | undefined;
  public readonly user_id: number;
  public readonly medical_id: number;
  public readonly animal_id: number;
  public readonly bullet_id: number;
  public readonly schedule_status: string;
  public readonly type_service: string;

  constructor(
    user_id: number,
    medical_id: number,
    animal_id: number,
    bullet_id: number,
    schedule_status: string,
    type_service: string,
    schedule_id?: number,
  ) {
    this.schedule_id = schedule_id;
    this.user_id = user_id;
    this.medical_id = medical_id;
    this.animal_id = animal_id;
    this.bullet_id = bullet_id;
    this.schedule_status = schedule_status;
    this.type_service = type_service;
  }
  
  static create(user_id: number, medical_id: number, animal_id: number, bullet_id: number) {
    const schedule = new Schedule(
      user_id,
      medical_id,
      animal_id,
      bullet_id,
      'SCHEDULED',
      'APPOINTMENT'
    );

    return schedule;
  }

}