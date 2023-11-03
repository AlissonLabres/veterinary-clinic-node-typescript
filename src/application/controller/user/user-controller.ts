import HttpAdapter from "../../entrypoint/http-adapter";
import UsecaseFactory from "../../factory/usecase-factory";

export default class UserController {

  constructor(
    private readonly httpAdapter: HttpAdapter,
    private readonly usecaseFactory: UsecaseFactory
  ) {
    this.createUser();
    this.getUsers();
  }

  /**
   * POST /user
   * @summary Create User
   * @tags User
   * @param {User} request.body.required
   * @return {UserResponse} 200 - Success response
   * @return {ErrorResponse} 400 - Error response
   */
  private async createUser() {
    this.httpAdapter.router('post', '/user', 201, async ({ user_name, user_email, user_phone }: any) =>
      await this.usecaseFactory.createUser.execute({ user_name, user_email, user_phone }));
  }

  /**
   * GET /users
   * @summary Get Users
   * @tags User
   * @return {UsersResponse} 200 - Success response
   * @return {ErrorResponse} 400 - Error response
   */
  private async getUsers() {
    this.httpAdapter.router('get', '/users', 200, async () =>
      await this.usecaseFactory.getUsers.execute());
  }
}