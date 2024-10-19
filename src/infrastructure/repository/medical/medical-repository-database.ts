import Medical from "../../../domain/entity/medical";
import Speciality from "../../../domain/entity/speciality";
import MedicalRepository from "../../../domain/repository/medical-repository";
import DatabaseConnection from "../database/database-connection";

export default class MedicalRepositoryDatabase implements MedicalRepository {
  constructor(private readonly databaseConnection: DatabaseConnection) {}

  async availableUrgentTo(bullet_code: string): Promise<Medical> {
    const [medicalData] = await this.databaseConnection.query(
      `
      SELECT DISTINCT medical.*
      FROM medical
      WHERE NOT EXISTS (
        SELECT 1
        FROM schedule
        JOIN bullet ON schedule.schedule_id = bullet.schedule_id
        WHERE bullet.bullet_code = $1
        AND schedule.medical_id = medical.medical_id
      )
    `,
      [bullet_code]
    );

    return Medical.restore(medicalData);
  }

  async availableTo(bullet_code: string, id: number): Promise<boolean> {
    const [medicalData] = await this.databaseConnection.query(
      `
      SELECT DISTINCT medical.*
      FROM medical
      WHERE EXISTS (
        SELECT 1
        FROM schedule
        JOIN bullet ON schedule.schedule_id = bullet.schedule_id
        WHERE bullet.bullet_code = $1
        AND schedule.medical_id = medical.medical_id
      ) AND medical.medical_id = $2
    `,
      [bullet_code, id]
    );

    return !medicalData;
  }

  async getMedicalsBySpeciality(speciality: number): Promise<Medical[]> {
    const medicalsData = await this.databaseConnection.query(
      `
      SELECT
        medical.medical_id,
        medical.medical_name,
        medical.medical_phone,
        medical.medical_email
      FROM
        medical_speciality
        JOIN medical ON medical.medical_id = medical_speciality.medical_id
        JOIN speciality ON speciality.speciality_id = medical_speciality.speciality_id
      WHERE speciality.speciality_id = $1;
    `,
      [speciality]
    );

    return medicalsData.map((medical: any) => Medical.restore(medical));
  }

  async getMedicalById(id: number): Promise<Medical> {
    const [medicalData] = await this.databaseConnection.query("SELECT * FROM medical WHERE medical.medical_id = $1", [
      id,
    ]);
    return Medical.restore(medicalData);
  }

  async getSpecialities(): Promise<Speciality[]> {
    const specialitiesData = await this.databaseConnection.query("select * from speciality", []);

    return specialitiesData.map((specialityData: any) => Speciality.restore(specialityData));
  }

  async getSpecialityById(id: number): Promise<Speciality> {
    const [specialityData] = await this.databaseConnection.query(
      "select * from speciality WHERE speciality.speciality_id = $1",
      [id]
    );

    return Speciality.restore(specialityData);
  }
}
