import User from "../domain/User";
import { IUser, IUserCreation } from "../interfaces/IUser";
import { ServiceResponse, ServiceResponseMessage } from "../interfaces/ServiceResponse";
import UserModel from "../models/UserModel";

export default class UserService {
  constructor(
    private userModel = new UserModel(),
  ) {}

  public async create(user: IUserCreation): Promise<ServiceResponse<User>> {
    const newUser = await this.userModel.create(user);
    return { 
      status: "CREATED",
      data: User.toUserModel(newUser),
    }
  }

  public async findById(id: number): Promise<ServiceResponse<User>> {
    const user = await this.userModel.findById(id);
    if (user) {
      return {
        status: "SUCCESSFUL",
        data: User.toUserModel(user),
      }
    }
    return {
      status: "NOT_FOUND",
      data: { message: 'User not found' } 
    }
  }

  public async findAll(): Promise<ServiceResponse<User[]>> {
    const users = await this.userModel.findAll();
    return {
      status: "SUCCESSFUL",
      data: users.map(user => User.toUserModel(user)),
    }
  }

  public async update(id: number, user: IUserCreation): Promise<ServiceResponse<User>> {
    const userUpdated = await this.userModel.update(id, user);
    if (userUpdated) {
      return {
        status: "SUCCESSFUL",
        data: User.toUserModel(userUpdated),
      }
    }
    return {
      status: "NOT_FOUND",
      data: { message: 'User not found' } 
    }
  }

  public async delete(id: number): Promise<ServiceResponse<ServiceResponseMessage>> {
    const userDeleted = await this.userModel.delete(id);
    if (userDeleted) {
      return {
        status: "SUCCESSFUL",
        data: { message: 'User deleted' },
      }
    }
    return {
      status: "NOT_FOUND",
      data: { message: 'User not found' } 
    }
  }
}