import crypto from "crypto";
import User from "../../../domain/entity/user";
import UserRepository from "../../../domain/repository/user-repository";
import MemoryConnection from "../database/memory-connection";
import UserException from "../../../domain/exception/user-exception";
import Animal from "../../../domain/entity/animal";
import AnimalException from "../../../domain/exception/animal-exception";

export default class UserRepositoryMemory implements UserRepository {
  constructor(private readonly memoryConnection: MemoryConnection) {}

  createAnimal(user_id: number, animal: Animal): Promise<Animal> {
    const user = this.memoryConnection.users.find((user) => user.user_id === user_id);

    if (!user) {
      throw new UserException();
    }

    const animal_id = crypto.randomInt(30);
    this.memoryConnection.animals.push({
      animal_id,
      animal_name: animal.animal_name.value,
      animal_age: animal.animal_age.value,
      animal_weight: animal.animal_weight,
      animal_type: animal.animal_type.value,
      animal_breed: animal.animal_breed,
      user_id: user.user_id,
    });

    user.user_animals = user.user_animals ? `${user.user_animals},${animal_id}` : `${animal_id}`;

    return Promise.resolve(
      Animal.restore({
        animal_id,
        animal_name: animal.animal_name.value,
        animal_age: animal.animal_age.value,
        animal_weight: animal.animal_weight,
        animal_type: animal.animal_type.value,
        animal_breed: animal.animal_breed,
        user_id: user.user_id,
      })
    );
  }

  getUserAndAnimalsById(user_id: number, animal_id: number): Promise<User> {
    const user = this.memoryConnection.users.find((user) => user.user_id === user_id);
    const animal = this.memoryConnection.animals.find((animal) => animal.animal_id === animal_id);

    return Promise.resolve(
      User.restore({
        user_id: user?.user_id,
        user_name: user?.user_name,
        user_email: user?.user_email,
        user_phone: user?.user_phone,
        user_animals: [animal?.animal_id],
      })
    );
  }

  getUserById(id: number): Promise<User> {
    const user = this.memoryConnection.users.find((user) => user.user_id === id);

    return Promise.resolve(User.restore({ ...user, user_animals: user?.user_animals.split(",") }));
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(
      this.memoryConnection.users.map((user) =>
        User.restore({
          user_id: user.user_id,
          user_name: user.user_name,
          user_email: user.user_email,
          user_phone: user.user_phone,
          user_animals: user.user_animals.split(","),
        })
      )
    );
  }

  create(user: User): Promise<User> {
    user.user_id = crypto.randomInt(30);

    this.memoryConnection.users.push({
      user_id: user.user_id,
      user_name: user.user_name.value,
      user_email: user.user_email.value,
      user_phone: user.user_phone.value,
      user_animals: "",
    });

    return Promise.resolve(
      User.restore({
        user_id: user.user_id,
        user_name: user.user_name.value,
        user_email: user.user_email.value,
        user_phone: user.user_phone.value,
        user_animals: [],
      })
    );
  }

  getAllAnimalsByUser(user: number): Promise<Animal[]> {
    return Promise.resolve(
      this.memoryConnection.animals
        .filter((animal) => animal.user_id === user)
        .map((animal) =>
          Animal.restore({
            animal_id: animal.animal_id,
            animal_name: animal.animal_name,
            animal_age: animal.animal_age,
            animal_weight: animal.animal_weight,
            animal_type: animal.animal_type,
            animal_breed: animal.animal_breed,
            user_id: user,
          })
        )
    );
  }
}
