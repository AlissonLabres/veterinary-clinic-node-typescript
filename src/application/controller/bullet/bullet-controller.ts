import HttpAdapter from "../../entrypoint/http-adapter";
import UsecaseFactory from "../../factory/usecase-factory";

export default class BulletController {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly usecaseFactory: UsecaseFactory
  ) {
    this.getBullets();
  }

  /**
   * GET /bullets
   * @summary Get all bullets available
   * @tags Bullet
   * @return {BulletsResponse} 200 - Success response
   * @return {ErrorResponse} 400 - Error response
   */
  private async getBullets() {
    this.httpAdapter.router('get', '/bullets', 200, async () => (
      { bullets: await this.usecaseFactory.getBullets.execute() }
    ));
  }
}