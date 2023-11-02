import User from "../../../entity/user";
import UserRepository from "../../../repository/user-repository";
import UserOutput from "../user-output";

export default class GetUsers {

  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserOutput[]> {
    const users: User[] = await this.userRepository.getUsers();

    const output: UserOutput[] = [];
    for (const user of users) {
      output.push(new UserOutput(
        user.user_id!,
        user.user_name.value,
        user.user_email.value,
        user.user_phone.value,
        user.user_animals
      ));
    }

    return output;
  }
}