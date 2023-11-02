import User from "../../../domain/entity/user";
import UserRepository from "../../../domain/repository/user-repository";
import DatabaseConnection from "../database/database-connection";

export default class UserRepositoryDatabase implements UserRepository {

  constructor(private readonly databaseConnection: DatabaseConnection) { }

  getUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async create(input: User): Promise<User> {
    const [{ user_id }] = await this.databaseConnection.query(`
      INSERT INTO users(user_name, user_email, user_phone)
      VALUES ($1, $2, $3)  RETURNING client_id
    `, [input.user_name, input.user_email, input.user_phone]);

    return User.restore({ ...input, user_id });
  }

}