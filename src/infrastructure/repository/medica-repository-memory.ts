import Medical from "../../domain/entity/medical";
import TimeOrDateException from "../../domain/exception/time-or-date-exception";
import MedicalRepository from "../../domain/repository/medical-repository";
import MemoryConnection from "./database/memory-connection";

export default class MedicalRepositoryMemory implements MedicalRepository {

  constructor(private readonly memoryConnection: MemoryConnection) { }

  availableUrgentTo(bullet_code: string): Promise<Medical> {
    const medicals = this.memoryConnection.medicals;
    const schedules = this.memoryConnection.schedules
    const bullets = this.memoryConnection.bullets.filter(bullet => bullet.bullet_code === bullet_code && bullet.schedule_id);

    if (!schedules.length) {
      return Promise.resolve(Medical.restore(medicals[0]));
    }

    const available = medicals.filter(
      (medical) => bullets
        .map((bullet) => schedules.find(schedule => schedule.schedule_id === bullet.schedule_id))
        .find((schedule: any) => schedule.medical_id !== medical.medical_id)
    )[0];

    return Promise.resolve(Medical.restore(available));
  }

  availableTo(bullet_code: string, id: number): Promise<boolean> {
    const bullet = this.memoryConnection.bullets.find((bullet) => bullet.bullet_code === bullet_code && bullet.schedule_id);
    if (!bullet) {
      return Promise.resolve(true);
    }

    const medical = this.memoryConnection.medicals.find((medical) => medical.medical_id === id);
    const medicalBusy = this.memoryConnection.schedules
      .filter((schedule) => schedule.bullet_id === bullet?.bullet_id)
      .find((schedule) => schedule.medical_id === medical?.medical_id);

    return Promise.resolve(!medicalBusy);
  }

  getMedicalsBySpeciality(speciality: string): Promise<Medical[]> {
    const medicals = this.memoryConnection.medicals.filter((medical) => medical.medical_specialities.includes(speciality));
    return Promise.resolve(medicals.map((medical) => Medical.restore(medical)));
  }

  getMedicalById(id: number): Promise<Medical> {
    const medical = this.memoryConnection.medicals.find((medical) => medical.medical_id === id);
    return Promise.resolve(Medical.restore(medical));
  }

}