const jwt = require('jsonwebtoken');
const isAuth = require('../../../src/app/utils/isAuth');

describe('isAuth', () => {
  test('should return 403 Forbidden Access if no token is provided', () => {
    const req = {
      headers: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    isAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Forbidden Access!',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 Unauthorized if the provided token is invalid', () => {
    const req = {
      headers: {
        authorization: 'Bearer invalidToken',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    jwt.verify = jest.fn((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    isAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Unauthorized!',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should set the decoded email in the request object and call next if the token is valid', () => {
    const req = {
      headers: {
        authorization: 'Bearer validToken',
      },
    };
    const res = {};
    const next = jest.fn();

    jwt.verify = jest.fn((token, secret, callback) => {
      callback(null, { email: 'test@example.com' });
    });

    isAuth(req, res, next);

    expect(req.email).toBe('test@example.com');
    expect(next).toHaveBeenCalled();
  });
});