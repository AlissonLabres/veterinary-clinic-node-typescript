import HttpAdapter from "../../entrypoint/http-adapter";
import UsecaseFactory from "../../factory/usecase-factory";

export default class AnimalController {
  constructor(public readonly httpAdapter: HttpAdapter, public readonly usecaseFactory: UsecaseFactory) {
    this.createAnimal();
    this.getAllAnimalsByUserId();
  }

  /**
   * POST /animal
   * @summary Create animal
   * @tags Animal
   * @param {CreateAnimalRequest} request.body.required - Animal info
   * @return {AnimalResponse} 201 - Success response
   */
  private async createAnimal() {
    this.httpAdapter.router(
      "post",
      "/animal",
      201,
      async ({ user_id, animal_name, animal_age, animal_weight, animal_type, animal_breed }: any) =>
        await this.usecaseFactory.createAnimal.execute({
          user_id,
          animal_name,
          animal_age,
          animal_weight,
          animal_type,
          animal_breed,
        })
    );
  }

  /**
   * GET /animal/{user_id}
   * @summary Get all animals by user_id
   * @tags Animal
   * @param {string} user_id.path - User ID
   * @return {Array<AnimalResponse>} 200 - Success response
   */
  private async getAllAnimalsByUserId() {
    this.httpAdapter.router("get", "/animal/$user_id", 200, async (_: any, { user_id }: any) => ({
      animals: await this.usecaseFactory.getAllAnimalsByUser.execute(user_id),
    }));
  }
}
