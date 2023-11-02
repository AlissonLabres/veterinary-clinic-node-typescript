import crypto from "crypto";
import User from "../../../domain/entity/user";
import UserRepository from "../../../domain/repository/user-repository";
import MemoryConnection from "../database/memory-connection";
import UserException from "../../../domain/exception/user-exception";

export default class UserRepositoryMemory implements UserRepository {

  constructor(private readonly memoryConnection: MemoryConnection) { }

  getUserById(id: number): Promise<User> {
    const user = this.memoryConnection.users.find(user => user.user_id === id);

    return Promise.resolve(
      User.restore({ ...user, user_animals: user?.user_animals.split(',') })
    );
  }
  
  getUsers(): Promise<User[]> {
    return Promise.resolve(
      this.memoryConnection.users.map(user =>
        User.restore({
          user_id: user.user_id,
          user_name: user.user_name,
          user_email: user.user_email,
          user_phone: user.user_phone,
          user_animals: user.user_animals.split(',')
        })
      ));
  }

  create(user: User): Promise<User> {
    user.user_id = crypto.randomInt(30);

    this.memoryConnection.users.push({
      user_id: user.user_id,
      user_name: user.user_name.value,
      user_email: user.user_email.value,
      user_phone: user.user_phone.value,
      user_animals: '',
    });

    return Promise.resolve(
      User.restore({
        user_id: user.user_id,
        user_name: user.user_name.value,
        user_email: user.user_email.value,
        user_phone: user.user_phone.value,
        user_animals: []
      })
    );
  }

}