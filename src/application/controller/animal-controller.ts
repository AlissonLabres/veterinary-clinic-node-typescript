import HttpAdapter from "../entrypoint/http-adapter";
import UsecaseFactory from "../factory/usecase-factory";

export default class AnimalController {
  constructor(
    public readonly httpAdapter: HttpAdapter,
    public readonly usecaseFactory: UsecaseFactory
  ) {
    this.createAnimal();
  }

  private async createAnimal() {
    this.httpAdapter.router('post', '/animal', 201,
      async ({ user_id, animal_name, animal_age, animal_weight, animal_type, animal_breed }: any) =>
        await this.usecaseFactory.createAnimal.execute({ user_id, animal_name, animal_age, animal_weight, animal_type, animal_breed }));
  }
}