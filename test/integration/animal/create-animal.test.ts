import User from "../../../src/domain/entity/user";
import CreateAnimal from "../../../src/domain/usecase/animal/create-animal/create-animal";
import MemoryConnection from "../../../src/infrastructure/repository/database/memory-connection";
import UserRepositoryMemory from "../../../src/infrastructure/repository/user/user-repository-memory";

describe('Animal - create', () => {
  let usecase: CreateAnimal;
  let user_id: number;

  beforeEach(async () => {
    const userRepository = new UserRepositoryMemory(new MemoryConnection());
    const user = await userRepository.create(
      User.create({
        user_name: 'Name Testing',
        user_email: 'email@testing.com.br',
        user_phone: '(41) 98888-2222'
      })
    );

    user_id = user.user_id!;
    usecase = new CreateAnimal(userRepository);
  });

  test('Should create animal', async () => {
    const input = {
      user_id,
      animal_name: 'Bob',
      animal_age: 1,
      animal_weight: 1,
      animal_type: 'DOG',
      animal_breed: 'Poodle'
    };

    const output = await usecase.execute(input);

    expect(output.animal_id).toBeDefined();
    expect(output.animal_name).toEqual('Bob');
    expect(output.animal_age).toEqual(1);
    expect(output.animal_weight).toEqual(1);
    expect(output.animal_type).toEqual('DOG');
    expect(output.animal_breed).toEqual('Poodle');
  });

  test('Should receive error UserException when create animal with user inexistent', async () => {
    const input = {
      user_id: 999,
      animal_name: 'Bob',
      animal_age: 1,
      animal_weight: 1,
      animal_type: 'DOG',
      animal_breed: 'Poodle'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'User is invalid', status: 400 };
    await expect(() => usecase.execute(input)).rejects.toEqual(exception);
  });
});