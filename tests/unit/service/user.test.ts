import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { IUserCreation } from '../../../src/interfaces/IUser';
import UserService from '../../../src/services/UserService';
import User from '../../../src/domain/User';

describe('User Service', function () {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a user', async () => {

    const userInput: IUserCreation = {
      displayName: "John Doe",
      email: "john@email.com",
      password: "123456",
    }

    const userOutput: User = new User(
      1,
      "John Doe",
      "john@email.com",
      "123456",
    );
    
    sinon.stub(Model, 'create').resolves(userOutput);
    sinon.stub(Model, 'findOne').resolves(null);

    const service = new UserService();
    const response = await service.create(userInput);
    
    expect(response.status).to.be.equal('CREATED');
    expect(response.data).to.be.deep.equal(userOutput);
  });

  it('should find a user by id', async () => {

    const userInput: IUserCreation = {
      displayName: "John Doe",
      email: "john@email.com",
      password: "123456",
    }

    const userOutput: User = new User(
      1,
      "John Doe",
      "john@email.com",
      "123456",
    );

    
    sinon.stub(Model, 'findOne').resolves(userOutput);

    const service = new UserService();
    const response = await service.findById(1);

    expect(response.status).to.be.equal('SUCCESSFUL');
    expect(response.data).to.be.deep.equal(userOutput);
  });

  it('should not find a user by id', async () => {
      
      sinon.stub(Model, 'findOne').resolves(null);
  
      const service = new UserService();
      const response = await service.findById(1);
  
      expect(response.status).to.be.equal('NOT_FOUND');
      expect(response.data).to.be.deep.equal({ message: 'User not found' });
  });
});
