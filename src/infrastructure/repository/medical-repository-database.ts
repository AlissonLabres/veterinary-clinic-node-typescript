import Medical from "../../domain/entity/medical";
import MedicalRepository from "../../domain/repository/medical-repository";
import DatabaseConnection from "./database/database-connection";

export default class MedicalRepositoryDatabase implements MedicalRepository {

  constructor(private readonly databaseConnection: DatabaseConnection) { }
  
  async availableTo(bullet_code: string, id: number): Promise<boolean> {
    const [medicalData] = await this.databaseConnection.query(`
      SELECT medical.* FROM bullet
        INNER JOIN schedule
        ON schedule.schedule_id = bullet.schedule_id
        INNER JOIN medical
        ON medical.medical_id = schedule.medical_id 
      WHERE bullet.bullet_code = $1
      AND medical.medical_id = $2
    `, [bullet_code, id]);

    return !medicalData;
  }

  async getMedicalsBySpeciality(speciality: string): Promise<Medical[]> {
    const medicalsData = await this.databaseConnection.query(`
      SELECT DISTINCT * FROM (
        SELECT
          medical.medical_id,
          medical.medical_name,
          medical.medical_phone,
          medical.medical_email,
          unnest(string_to_array(medical.medical_specialities, ',')) AS medical_specialities
        FROM medical
      ) AS medicals
      WHERE medicals.medical_specialities = $1
    `, [speciality]);
    
    return medicalsData.map((medical: any) => Medical.restore(medical));
  }

  async getMedicalById(id: number): Promise<Medical> {
    const [medicalData] = await this.databaseConnection.query('SELECT * FROM medical WHERE medical.medical_id = $1', [id]);
    return Medical.restore(medicalData);
  }

}