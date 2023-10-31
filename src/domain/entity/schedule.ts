import TypeService from "./value-object/type-service";
import ScheduleException from "../exception/schedule-exception";

export default class Schedule {
  public schedule_id: number | undefined;
  public schedule_status: string;
  public readonly user_id: number;
  public readonly medical_id: number;
  public readonly animal_id: number;
  public readonly bullet_id: number;
  public readonly type_service: TypeService

  constructor(
    user_id: number,
    medical_id: number,
    animal_id: number,
    bullet_id: number,
    schedule_status: string,
    type_service: 'APPOINTMENT' | 'URGENT',
    schedule_id?: number,
  ) {
    this.schedule_id = schedule_id;
    this.schedule_status = schedule_status;
    this.type_service = new TypeService(type_service);

    this.user_id = user_id;
    this.medical_id = medical_id;
    this.animal_id = animal_id;
    this.bullet_id = bullet_id;
  }

  static restore(dto: any) {
    if (!dto || !dto.schedule_id) {
      throw new ScheduleException();
    }

    const schedule = new Schedule(
      dto.user_id,
      dto.medical_id,
      dto.animal_id,
      dto.bullet_id,
      dto.schedule_status,
      dto.type_service,
      dto.schedule_id
    );

    return schedule;    
  }
  
  static create(user_id: number, medical_id: number, animal_id: number, bullet_id: number, type_service: 'APPOINTMENT' | 'URGENT' = 'APPOINTMENT') {
    const schedule = new Schedule(
      user_id,
      medical_id,
      animal_id,
      bullet_id,
      'SCHEDULED',
      type_service
    );

    return schedule;
  }

  cancel() {
    this.schedule_status = 'CANCELED';
  }

}