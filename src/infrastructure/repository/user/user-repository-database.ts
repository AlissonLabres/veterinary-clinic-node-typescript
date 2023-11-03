import Animal from "../../../domain/entity/animal";
import User from "../../../domain/entity/user";
import UserRepository from "../../../domain/repository/user-repository";
import DatabaseConnection from "../database/database-connection";

export default class UserRepositoryDatabase implements UserRepository {

  constructor(private readonly databaseConnection: DatabaseConnection) { }

  async createAnimal(user_id: number, animal: Animal): Promise<Animal> {
    const [{ animal_id }] = await this.databaseConnection.query(`
      INSERT INTO animal(animal_name, animal_age, animal_weight, animal_type, animal_breed)
      VALUES ($1, $2, $3, $4, $5) RETURNING animal_id
    `, [animal.animal_name.value, animal.animal_age.value, animal.animal_weight, animal.animal_type.value, animal.animal_breed]);

    const [user] = await this.databaseConnection.query(`SELECT * FROM users WHERE user_id = $1`, [user_id]);
    const user_animals = user.user_animals ? `${user.user_animals},${animal_id}` : `${animal_id}`;
    await this.databaseConnection.query(`UPDATE users SET user_animals = $1 WHERE user_id = $2`, [user_animals, user_id]);

    return Animal.restore({
      animal_id,
      animal_name: animal.animal_name.value,
      animal_age: animal.animal_age.value,
      animal_weight: animal.animal_weight,
      animal_type: animal.animal_type.value,
      animal_breed: animal.animal_breed
    });
  }

  async getUserById(id: number): Promise<User> {
    const [user] = await this.databaseConnection.query(`SELECT * FROM users WHERE user_id = $1`, [id]);

    return User.restore({ ...user, user_animals: user.user_animals?.split(',') });
  }

  async getUsers(): Promise<User[]> {
    const users = await this.databaseConnection.query(`SELECT * FROM users`, []);
    return users.map((user: any) => User.restore({ ...user, user_animals: user.user_animals?.split(',') }));
  }

  async create(input: User): Promise<User> {
    const [{ user_id }] = await this.databaseConnection.query(`
      INSERT INTO users(user_name, user_email, user_phone)
      VALUES ($1, $2, $3)  RETURNING user_id
    `, [input.user_name.value, input.user_email.value, input.user_phone.value]);

    return User.restore({ 
      user_id: user_id,
      user_name: input.user_name.value,
      user_email: input.user_email.value,
      user_phone: input.user_phone.value,
      user_animals: []
    });
  }

}