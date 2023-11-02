import User from "../entity/user";

export default interface UserRepository { 

  create(input: User): Promise<User>;

  getUsers(): Promise<User[]>;

}