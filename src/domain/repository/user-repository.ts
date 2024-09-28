import Animal from "../entity/animal";
import User from "../entity/user";

export default interface UserRepository {
  create(input: User): Promise<User>;

  getUsers(): Promise<User[]>;

  getUserById(id: number): Promise<User>;

  getUserAndAnimalsById(user_id: number, animal_id: number): Promise<User>;

  createAnimal(user_id: number, animal: Animal): Promise<Animal>;

  getAllAnimalsByUser(user: number): Promise<Animal[]>;
}
