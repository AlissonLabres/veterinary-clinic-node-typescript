import UserRepository from "../../../repository/user-repository";
import Animal from "../../../entity/animal";
import AnimalOutput from "../animal-output";

export default class GetAllAnimalsByUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user_id: number): Promise<AnimalOutput[]> {
    const animals: Animal[] = await this.userRepository.getAllAnimalsByUser(user_id);
    const output: AnimalOutput[] = [];
    for (const animal of animals) {
      output.push(
        new AnimalOutput(
          animal.animal_id!,
          animal.animal_name.value,
          animal.animal_age.value,
          animal.animal_weight,
          animal.animal_type.value,
          animal.animal_breed
        )
      );
    }

    return output;
  }
}
