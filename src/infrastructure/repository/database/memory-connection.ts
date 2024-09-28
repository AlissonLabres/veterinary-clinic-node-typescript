interface ScheduleMemory {
  user_id: number;
  medical_id: number;
  animal_id: number;
  schedule_status: string;
  bullet_id: number | undefined;
  type_service: "APPOINTMENT" | "URGENT";
  schedule_id?: number;
}

interface BulletMemory {
  bullet_code: string;
  bullet_id: number;
  schedule_id?: number | undefined;
}

interface MedicalMemory {
  medical_name: string;
  medical_specialities: string;
  medical_phone: string;
  medical_email: string;
  medical_id: number;
}

interface UsersMemory {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_animals: string;
  user_id: number;
}

interface AnimalsMemory {
  animal_name: string;
  animal_age: number;
  animal_weight: number;
  animal_type: string;
  animal_breed: string;
  animal_id: number;
  user_id: number;
}

export default class MemoryConnection {
  bullets: BulletMemory[] = [];
  schedules: ScheduleMemory[] = [];
  medicals: MedicalMemory[] = [];
  users: UsersMemory[] = [];
  animals: AnimalsMemory[] = [];

  constructor() {}
}
