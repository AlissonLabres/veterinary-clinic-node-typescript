interface ScheduleMemory {
  user_id: number,
  medical_id: number,
  animal_id: number,
  schedule_status: string,
  bullet_id: number | undefined,
  type_service: 'APPOINTMENT' | 'URGENT',
  schedule_id?: number,
}

interface BulletMemory {
  bullet_code: string,
  bullet_id: number,
  schedule_id?: number | undefined,
}

interface MedicalMemory {
  medical_name: string,
  medical_specialities: string,
  medical_phone: string,
  medical_email: string,
  medical_id: number
}

interface UsersMemory {
  user_name: string,
  user_email: string,
  user_phone: string,
  user_animals: string,
  user_id: number
}

export default class MemoryConnection {
  bullets: BulletMemory[] = [];
  schedules: ScheduleMemory[] = [];
  medicals: MedicalMemory[];
  users: UsersMemory[] = [];

  constructor() {
    this.users = [];
    this.schedules = [];
    this.bullets = [];
    this.bullets.push(
      { bullet_code: '2023-08-08T16:00', bullet_id: 1 },
      { bullet_code: '2023-09-08T16:00', bullet_id: 2 },
      { bullet_code: '2023-09-03T16:00', bullet_id: 3 },
      { bullet_code: '2023-08-08T16:00', bullet_id: 4 },
      { bullet_code: '2023-08-08T16:00', bullet_id: 5 },
      { bullet_code: '2023-08-08T16:00', bullet_id: 6 },
    )
    this.medicals = [
      {
        medical_name: 'Dr. João',
        medical_specialities: 'GENERAL_DOCTOR,VACCINATION',
        medical_phone: '21999999999',
        medical_email: 'joao@veterinaryclinical.com.br',
        medical_id: 1
      }
    ]
  }
}