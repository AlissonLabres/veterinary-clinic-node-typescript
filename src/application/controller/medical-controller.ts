import HttpAdapter from "../entrypoint/http-adapter";
import UsecaseFactory from "../factory/usecase-factory";

export default class MedicalController {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly usecaseFactory: UsecaseFactory
  ) { 
    this.getMedicalsBySpeciality();
  }

  private async getMedicalsBySpeciality() {
    this.httpAdapter.router('get', '/medical/$speciality', 200, async (_: any, { speciality }: any) =>
      ({ medicals: await this.usecaseFactory.getMedicalsBySpeciality.execute(speciality) }));
  }
}