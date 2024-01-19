import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/index';
import { IUserCreation } from '../../../src/interfaces/IUser';
import User from '../../../src/domain/User';
import { Model } from 'mongoose';

chai.use(chaiHttp);

describe('POST /users', function () { 
  afterEach(() => {
    sinon.restore();
  });

  it('should return status 201 and the user data', async function () {

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

    const httpResponse = await chai.request(app).post('/users').send(userInput);

    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(userOutput);
  });
});