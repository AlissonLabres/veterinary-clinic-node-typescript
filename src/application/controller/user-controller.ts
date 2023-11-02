import HttpAdapter from "../entrypoint/http-adapter";
import UsecaseFactory from "../factory/usecase-factory";

export default class UserController {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly usecaseFactory: UsecaseFactory
  ) {
    this.createUser();
  }

  private async createUser() {
    this.httpAdapter.router('post', '/user', 201, async ({ user_name, user_email, user_phone }: any) =>
      await this.usecaseFactory.createUser.execute({ user_name, user_email, user_phone }));
  }
}