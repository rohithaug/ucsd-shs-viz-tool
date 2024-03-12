const pick = require('../../../src/app/utils/pick');

describe('pick', () => {
  test('should return an object with the picked properties', () => {
    const object = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
      address: '123 Main St',
    };
    const keys = ['name', 'email'];
    const result = pick(object, keys);

    expect(result).toEqual({ name: 'John', email: 'john@example.com' });
  });

  test('should return an empty object if no properties are picked', () => {
    const object = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
      address: '123 Main St',
    };
    const keys = [];
    const result = pick(object, keys);

    expect(result).toEqual({});
  });

  test('should return an empty object if the object is null or undefined', () => {
    const object = null;
    const keys = ['name', 'email'];
    const result = pick(object, keys);

    expect(result).toEqual({});

    const undefinedObject = undefined;
    const undefinedResult = pick(undefinedObject, keys);

    expect(undefinedResult).toEqual({});
  });

  test('should ignore properties that do not exist in the object', () => {
    const object = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
      address: '123 Main St',
    };
    const keys = ['name', 'email', 'phone'];
    const result = pick(object, keys);

    expect(result).toEqual({ name: 'John', email: 'john@example.com' });
  });
});