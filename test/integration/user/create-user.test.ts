import UserException from "../../../src/domain/exception/user-exception";
import CreateUser from "../../../src/domain/usecase/user/create-user/create-user";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import UserRepositoryMemory from "../../../src/infrastructure/repository/user/user-repository-memory";

test('Should create user all corrects fields', async () => {
  const userRepository = new UserRepositoryMemory(new MemoryConnection());
  const input = {
    user_name: 'João Silva',
    user_email: 'joao@email.com.br',
    user_phone: '(41) 99658-1156'
  };

  const usecase = new CreateUser(userRepository);
  const user = await usecase.execute(input);
  expect(user.user_name).toEqual("João Silva");
});

test('Don`t should create user when any parameter is invalid', async () => {
  const userRepository = new UserRepositoryMemory(new MemoryConnection());
  const input = {
    user_name: 'João Silva',
    user_email: 'joaoerroremail.com.br',
    user_phone: '(41) 99658-1156'
  };

  const usecase = new CreateUser(userRepository);
  await expect(() => usecase.execute(input)).rejects.toBeInstanceOf(UserException);
});
