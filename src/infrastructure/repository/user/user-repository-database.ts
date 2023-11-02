import Animal from "../../../domain/entity/animal";
import User from "../../../domain/entity/user";
import UserRepository from "../../../domain/repository/user-repository";
import DatabaseConnection from "../database/database-connection";

export default class UserRepositoryDatabase implements UserRepository {

  constructor(private readonly databaseConnection: DatabaseConnection) { }

  async createAnimal(user_id: number, animal: Animal): Promise<Animal> {
    const [{ animal_id }] = await this.databaseConnection.query(`
      INSERT INTO animals(animal_name, animal_age, animal_weight, animal_type, animal_breed)
      VALUES ($1, $2, $3, $4, $5) RETURNING animal_id
    `, [animal.animal_name.value, animal.animal_age.value, animal.animal_weight, animal.animal_type.value, animal.animal_breed]);

    const [user] = await this.databaseConnection.query(`SELECT * FROM users WHERE user_id = $1`, [user_id]);
    const user_animals = user.user_animals ? `${user.user_animals},${animal_id}` : `${animal_id}`;
    await this.databaseConnection.query(`UPDATE users SET user_animals = $1 WHERE user_id = $2`, [user_animals, user_id]);

    return Animal.restore({ ...animal, animal_id });
  }

  async getUserById(id: number): Promise<User> {
    const [user] = await this.databaseConnection.query(`SELECT * FROM users WHERE user_id = $1`, [id]);

    return User.restore({ ...user, user_animals: user.user_animals.split(',') });
  }

  async getUsers(): Promise<User[]> {
    const users = await this.databaseConnection.query(`SELECT * FROM users`, []);

    return users.map((user: any) => User.restore({ ...user, user_animals: user.user_animals.split(',') }));
  }

  async create(input: User): Promise<User> {
    const [{ user_id }] = await this.databaseConnection.query(`
      INSERT INTO users(user_name, user_email, user_phone)
      VALUES ($1, $2, $3)  RETURNING client_id
    `, [input.user_name, input.user_email, input.user_phone]);

    return User.restore({ ...input, user_id });
  }

}