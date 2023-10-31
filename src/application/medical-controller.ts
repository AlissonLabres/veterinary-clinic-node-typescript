import HttpAdapter from "./entrypoint/http-adapter";
import UsecaseFactory from "./factory/usecase-factory";

export default class MedicalController {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly usecaseFactory: UsecaseFactory
  ) { }

  register() {
    this.httpAdapter.router(
      'get',
      '/medical/$speciality',
      200,
      async (_: any, params: any) => this.getMedicalsBySpeciality(params));
  }

  private async getMedicalsBySpeciality(params: any) {
    const { speciality } = params;
    const medicals = await this.usecaseFactory.getMedicalsBySpeciality.execute(speciality);

    return { medicals };
  }
}