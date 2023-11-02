import Animal from "../../src/domain/entity/animal";
import User from "../../src/domain/entity/user";
import AnimalException from "../../src/domain/exception/animal-exception";

test('Should restore animal', () => {
  const input = {
    animal_id: 1,
    animal_name: 'Bob',
    animal_age: 1,
    animal_weight: 1,
    animal_type: 'DOG',
    animal_breed: 'Poodle'
  };

  const animal = Animal.restore(input);
  expect(animal.animal_name.value).toEqual("Bob");
})

test('Should receive error AnimalException when restore animal with animal inexistent', () => {
  const input = {};
  expect(() => Animal.restore(input)).toThrow(AnimalException);
})


describe('Animal - name', () => {
  test('Don`t should create animal when name empty', async () => {
    const input = {
      animal_name: '',
      animal_age: 1,
      animal_weight: 1,
      animal_type: 'DOG',
      animal_breed: 'Poodle'
    };

    const exception = { name: 'ANIMAL_EXCEPTION', message: 'Name is required', status: 400 };
    expect(() => Animal.create(input)).toThrowError(exception);
    expect(() => Animal.create(input)).toThrow(AnimalException);
  });

  test('Don`t should create animal when name with 2 characters', async () => {
    const input = {
      animal_name: 'Bo',
      animal_age: 1,
      animal_weight: 1,
      animal_type: 'DOG',
      animal_breed: 'Poodle'
    };

    const exception = { name: 'ANIMAL_EXCEPTION', message: 'Name must have a minimum of 3 characters and maximum of 255 characters', status: 400 };
    expect(() => Animal.create(input)).toThrowError(exception);
    expect(() => Animal.create(input)).toThrow(AnimalException);
  });

  test('Don`t should create animal when name with 256 characters', async () => {
    const input = {
      animal_name: 'Bob'.repeat(90),
      animal_age: 1,
      animal_weight: 1,
      animal_type: 'DOG',
      animal_breed: 'Poodle'
    };

    const exception = { name: 'ANIMAL_EXCEPTION', message: 'Name must have a minimum of 3 characters and maximum of 255 characters', status: 400 };
    expect(() => Animal.create(input)).toThrowError(exception);
    expect(() => Animal.create(input)).toThrow(AnimalException);
  });
});

describe('Animal - age', () => {
  test('Don`t should create animal when age empty', async () => {
    const input = {
      animal_name: 'Bob',
      animal_age: undefined,
      animal_weight: 1,
      animal_type: 'DOG',
      animal_breed: 'Poodle'
    };

    const exception = { name: 'ANIMAL_EXCEPTION', message: 'Age is required', status: 400 };
    expect(() => Animal.create(input)).toThrowError(exception);
    expect(() => Animal.create(input)).toThrow(AnimalException);
  });

  test('Don`t should create animal when age less than 0', async () => {
    const input = {
      animal_name: 'Bob',
      animal_age: -1,
      animal_weight: 1,
      animal_type: 'DOG',
      animal_breed: 'Poodle'
    };

    const exception = { name: 'USER_EXCEPTION', message: 'Age must be greater than 0', status: 400 };
    expect(() => Animal.create(input)).toThrowError(exception);
    expect(() => Animal.create(input)).toThrow(AnimalException);
  });
});

