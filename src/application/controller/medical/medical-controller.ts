import HttpAdapter from "../../entrypoint/http-adapter";
import UsecaseFactory from "../../factory/usecase-factory";

export default class MedicalController {
  constructor(private readonly httpAdapter: HttpAdapter, private readonly usecaseFactory: UsecaseFactory) {
    this.getSpecialities();
    this.getMedicalsBySpeciality();
  }

  /**
   * GET /medical/speciality
   * @summary Get all specialities
   * @tags Medical
   * @return {} 200 - Success response
   * @return {ErrorResponse} 400 - Error response
   */
  private async getSpecialities() {
    this.httpAdapter.router("get", "/medical/speciality", 200, async () => ({
      specialities: await this.usecaseFactory.getSpecialities.execute(),
    }));
  }

  /**
   * GET /medical/{speciality_id}
   * @summary Get all medicals by speciality
   * @tags Medical
   * @param {number} speciality_id.path - ID Speciality
   * @return {} 200 - Success response
   * @return {ErrorResponse} 400 - Error response
   */
  private async getMedicalsBySpeciality() {
    this.httpAdapter.router("get", "/medical/$speciality_id", 200, async (_: any, { speciality_id }: any) => ({
      medicals: await this.usecaseFactory.getMedicalsBySpeciality.execute(speciality_id),
    }));
  }
}
