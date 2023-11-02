import User from "../../src/domain/entity/user";
import UserException from "../../src/domain/exception/user-exception";

test('Should restore user', () => {
  const input = {
    user_id: 1,
    user_name: 'João Silva',
    user_email: 'joao@anyemail.com.br',
    user_phone: '(41) 99658-1156'
  };

  const user = User.restore(input);
  expect(user.user_name.value).toEqual("João Silva");
})

test('Should receive error UserException when restore user with user_id inexistent', () => {
  const input = {};
  expect(() => User.restore(input)).toThrow(UserException);
})


describe('User - name', () => {
  test('Don`t should create user when name empty', async () => {
    const input = {
      user_id: 1,
      user_name: '',
      user_email: 'joao@anyemail.com.br',
      user_phone: '(41) 99658-1156'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Name is required', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });

  test('Don`t should create user when name with 2 characters', async () => {
    const input = {
      user_id: 1,
      user_name: 'Jo',
      user_email: 'joao@anyemail.com.br',
      user_phone: '(41) 99658-1156'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Name must have a minimum of 3 characters and maximum of 255 characters', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });

  test('Don`t should create user when name with 256 characters', async () => {
    const input = {
      user_id: 1,
      user_name: 'João da Silva Carvalho Alves Ferreira Castro Azevedo Correia Cardoso de Oliveira Santos Pereira de Souza Goncalves Alves Gomes Barbosa Barros Ribeiro Lima Almeida Gomes de Melo Araujo Costa Martins Neto Pereira Ribeiro Lima Almeida Gomes de Melo Araujo Costa',
      user_email: 'joao@anyemail.com.br',
      user_phone: '(41) 99658-1156'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Name must have a minimum of 3 characters and maximum of 255 characters', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });

  test('Don`t should create user when name with 256 characters', async () => {
    const input = {
      user_id: 1,
      user_name: 'João',
      user_email: 'joao@anyemail.com.br',
      user_phone: '(41) 99658-1156'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Name must have at least two names', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });
});

describe('User - email', () => {
  test('Don`t should create user when email empty', async () => {
    const input = {
      user_id: 1,
      user_name: 'João Silva',
      user_email: '',
      user_phone: '(41) 99658-1156'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Email is required', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });

  test('Don`t should create user when email incorrect', async () => {
    const input = {
      user_id: 1,
      user_name: 'João Silva',
      user_email: '~joão$anyemail.com.br',
      user_phone: '(41) 99658-1156'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Email is invalid', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });

  test('Don`t should create user when email with 256 characters', async () => {
    const input = {
      user_id: 1,
      user_name: 'João Silva',
      user_email: 'joaosilvacarvalhoalvesferreiracastroazevedocorreiacardosodeoliveirasantospereiradesouzagoncalvesalvesgomesbarbosabarrosribeirolimaalmeidagomesdemeloaraujocostamartinsnetopereiraribeirolimaalmeidagomesdemeloaraujocosta@anywhereemailtocontainsmorecharecters.com.br',
      user_phone: '(41) 99658-1156'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Email must have a minimum of 3 characters and a maximum of 255 characters', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });
});

describe('User - phone', () => {
  test('Don`t should create user when phone empty', async () => {
    const input = {
      user_id: 1,
      user_name: 'João Silva',
      user_email: 'joao@anyemail.com.br',
      user_phone: ''
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Phone is required', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });

  test('Don`t should create user when phone with less 11 characters', async () => {
    const input = {
      user_id: 1,
      user_name: 'João Silva',
      user_email: 'joao@anyemail.com.br',
      user_phone: '(41) 9658-1156'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Phone must have a 11 characters', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });

  test('Don`t should create user when phone with more 11 characters', async () => {
    const input = {
      user_id: 1,
      user_name: 'João Silva',
      user_email: 'joao@anyemail.com.br',
      user_phone: '(41) 999658-1156'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Phone must have a 11 characters', status: 400 };
    expect(() => User.create(input)).toThrowError(exception);
    expect(() => User.create(input)).toThrow(UserException);
  });
});

