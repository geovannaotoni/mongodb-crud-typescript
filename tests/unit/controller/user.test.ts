import { Request, Response, NextFunction } from 'express';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import UserController from '../../../src/controllers/UserController';
import UserService from '../../../src/services/UserService';
import { IUserCreation } from '../../../src/interfaces/IUser';
import { ServiceResponse } from '../../../src/interfaces/ServiceResponse';
import User from '../../../src/domain/User';

chai.use(sinonChai);

describe('UserController', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a user', async () => {
    const userInput: IUserCreation = {
      displayName: "John Doe",
      email: "john@email.com",
      password: "123456",
    }

    req.body = userInput;

    const userOutput: User = new User(
      1,
      "John Doe",
      "john@email.com",
      "123456",
    );
    const serviceResponse: ServiceResponse<User> = {
      status: 'CREATED',
      data: userOutput,
    }

    const userService = new UserService();
    sinon.stub(userService, 'create').resolves(serviceResponse);

    const userController = new UserController(userService);
    await userController.create(req, res, next);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(serviceResponse.data);
  });
});