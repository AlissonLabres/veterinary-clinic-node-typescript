import GetUsers from "../../../src/domain/usecase/user/get-all-users/get-users";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import UserRepositoryMemory from "../../../src/infrastructure/repository/user/user-repository-memory";
import { USER } from "../../mock";

describe("User - get all users", () => {
  let memoryConnection: MemoryConnection;
  let usecase: GetUsers;

  beforeEach(() => {
    memoryConnection = new MemoryConnection();
    const repository = new UserRepositoryMemory(memoryConnection);
    usecase = new GetUsers(repository);
  });

  test("Should get users empty", async () => {
    const users = await usecase.execute();
    expect(users).toHaveLength(0);
  });

  test("Should receive one item in list when execute GetUsers", async () => {
    memoryConnection.users.push(USER("1"));
    const users = await usecase.execute();

    expect(users).toHaveLength(1);
    expect(users[0].user_name).toEqual("Testing Exemplo");
  });
});
