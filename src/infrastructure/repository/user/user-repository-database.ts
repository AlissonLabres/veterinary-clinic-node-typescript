import Animal from "../../../domain/entity/animal";
import User from "../../../domain/entity/user";
import UserRepository from "../../../domain/repository/user-repository";
import DatabaseConnection from "../database/database-connection";

export default class UserRepositoryDatabase implements UserRepository {

  constructor(private readonly databaseConnection: DatabaseConnection) { }

  async createAnimal(user_id: number, animal: Animal): Promise<Animal> {
    const [{ animal_id }] = await this.databaseConnection.query(`
      INSERT INTO animal(animal_name, animal_breed, animal_age, animal_weight, animal_type, user_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING animal_id
    `, [animal.animal_name.value, animal.animal_breed, animal.animal_age.value, animal.animal_weight, animal.animal_type.value, user_id]);

    return Animal.restore({ 
      animal_id: animal_id,
      animal_name: animal.animal_name.value,
      animal_age: animal.animal_age.value,
      animal_weight: animal.animal_weight,
      animal_type: animal.animal_type.value,
      animal_breed: animal.animal_breed
    });
  }

  async getUserAndAnimalsById(user_id: number, animal_id: number): Promise<User> {
    const [user] = await this.databaseConnection.query(`
      SELECT users.*, animal.animal_id FROM users 
      LEFT JOIN animal ON animal.user_id = users.user_id
      WHERE user_id = $1
      AND animal_id = $2
    `, [user_id, animal_id]);

    return User.restore({
      user_id: user.user_id,
      user_name: user.user_name,
      user_email: user.user_email,
      user_phone: user.user_phone,
      user_animals: [user.animal_id]
    });
  }

  async getUserById(id: number): Promise<User> {
    const [user] = await this.databaseConnection.query(`SELECT * FROM users WHERE user_id = $1`, [id]);

    return User.restore({
      user_id: user.user_id,
      user_name: user.user_name,
      user_email: user.user_email,
      user_phone: user.user_phone,
      user_animals: []
    });
  }

  async getUsers(): Promise<User[]> {
    const users = await this.databaseConnection.query(`
      SELECT users.*, animal.animal_id FROM users
      LEFT JOIN animal ON animal.user_id = users.user_id
    `, []);
    
    const group = users.reduce((previus: any, user: any) => {
      if (previus[user.user_id]) {
        previus[user.user_id].user_animals.push(user.animal_id);
      } else {
        previus[user.user_id] = { ...user, user_animals: [user.animal_id] };
      }

      return previus;
    }, {});

    return Object.values(group)
      .filter((user: any) => user)
      .map((user: any) => User.restore({
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_phone: user.user_phone,
        user_animals: user.user_animals
      }));
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