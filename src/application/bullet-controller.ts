import HttpAdapter from "./entrypoint/http-adapter";
import UsecaseFactory from "./factory/usecase-factory";

export default class BulletController {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly usecaseFactory: UsecaseFactory
  ) { }

  register() {
    this.httpAdapter.router('get', '/bullets', 200, async () => this.getBullets());
  }

  private async getBullets() {
    const bullets = await this.usecaseFactory.getBullets.execute();
    
    return { bullets };
  }
}