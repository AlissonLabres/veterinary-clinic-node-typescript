import Animal from "../../../entity/animal";
import UserRepository from "../../../repository/user-repository";
import AnimalInput from "../animal-input";
import AnimalOutput from "../animal-output";

export default class CreateAnimal {

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(input: AnimalInput): Promise<AnimalOutput> {
    const user = await this.userRepository.getUserById(input.user_id);
    const animal = await this.userRepository.createAnimal(user.user_id!, Animal.create(input));

    return {
      animal_id: animal.animal_id!,
      animal_name: animal.animal_name.value,
      animal_age: animal.animal_age.value,
      animal_weight: animal.animal_weight,
      animal_type: animal.animal_type.value,
      animal_breed: animal.animal_breed
    };
  }
}