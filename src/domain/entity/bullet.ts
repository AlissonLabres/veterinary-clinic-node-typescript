import TimeOrDateException from "../exception/time-or-date-exception";

export default class Bullet {
  bullet_code: string;
  bullet_id: number;
  schedule_id: number | undefined;

  constructor(
    bullet_code: string,
    bullet_id: number,
    schedule_id: number
  ) {
    this.bullet_code = bullet_code;
    this.bullet_id = bullet_id;
    this.schedule_id = schedule_id;
  }

  static restore(dto: any) {
    if (!dto || !dto.bullet_id) {
      throw new TimeOrDateException();
    }

    return new Bullet(
      dto.bullet_code,
      dto.bullet_id,
      dto.schedule_id
    );
  }
  
}