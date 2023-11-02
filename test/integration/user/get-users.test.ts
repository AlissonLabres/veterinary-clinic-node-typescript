import CreateUser from "../../../src/domain/usecase/user/create-user/create-user";
import GetUsers from "../../../src/domain/usecase/user/get-all-users/get-users";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import UserRepositoryMemory from "../../../src/infrastructure/repository/user/user-repository-memory"

test('Should get users empty', async () => {
  const repository = new UserRepositoryMemory(new MemoryConnection());
  const usecase = new GetUsers(repository);

  const users = await usecase.execute();
  expect(users).toHaveLength(0);
});

test('Should create and list in GetUsers', async () => {
  const userRepository = new UserRepositoryMemory(new MemoryConnection());
  const createUsecase = new CreateUser(userRepository);
  await createUsecase.execute({
    user_name: 'João Silva',
    user_email: 'joao@email.com.br',
    user_phone: '(41) 99658-1156'
  });

  const usecase = new GetUsers(userRepository);
  const users = await usecase.execute();

  expect(users).toHaveLength(1);
  expect(users[0].user_name).toEqual("João Silva");
});