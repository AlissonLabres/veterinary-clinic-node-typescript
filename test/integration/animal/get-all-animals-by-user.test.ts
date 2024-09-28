import AnimalOutput from "../../../src/domain/usecase/animal/animal-output";
import GetAllAnimalsByUser from "../../../src/domain/usecase/animal/get-all-animals-by-user/get-all-animals-by-user";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import UserRepositoryMemory from "../../../src/infrastructure/repository/user/user-repository-memory";
import { ANIMAL, USER } from "../../mock";

describe("Animal - get all by user id", () => {
  let memoryConnection: MemoryConnection;
  let usecase: GetAllAnimalsByUser;

  beforeEach(() => {
    memoryConnection = new MemoryConnection();
    const repository = new UserRepositoryMemory(memoryConnection);

    usecase = new GetAllAnimalsByUser(repository);
  });

  test("Should empty list when execute usecase GetAllAnimalsByUser", async () => {
    const output: AnimalOutput[] = await usecase.execute(1);
    expect(output.length).toEqual(0);
  });

  test("Should one item in list when execute usecase GetAllAnimalsByUser", async () => {
    memoryConnection.users.push(USER("1"));
    memoryConnection.animals.push(ANIMAL(1));

    const output: AnimalOutput[] = await usecase.execute(1);
    expect(output.length).toEqual(1);
  });
});
