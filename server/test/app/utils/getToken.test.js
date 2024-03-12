const getToken = require('../../../src/app/utils/getToken');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('getToken', () => {
  test('should return a valid JWT token', () => {
    const admin = {
      email: 'test@example.com',
      name: 'Test User',
    };
    const token = 'mocked-token';

    jwt.sign.mockReturnValueOnce(token);

    const result = getToken(admin);

    expect(result).toBe(token);
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        email: admin.email,
        name: admin.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );
  });
});