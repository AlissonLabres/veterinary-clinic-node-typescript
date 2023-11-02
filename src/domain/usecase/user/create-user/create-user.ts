import User from "../../../entity/user";
import UserRepository from "../../../repository/user-repository";
import UserInput from "../user-input";
import UserOutput from "../user-output";

export default class CreateUser {

  constructor(private readonly userRepository: UserRepository) {}
    
  async execute(input: UserInput): Promise<UserOutput> {
    const user = await this.userRepository.create(User.create(input));

    return new UserOutput(
      user.user_id!,
      user.user_name.value,
      user.user_email.value,
      user.user_phone.value,
      []
    );
  }
}