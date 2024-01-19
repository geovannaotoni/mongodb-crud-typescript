import { Model, Schema, model, models } from "mongoose";
import { IUser, IUserCreation } from "../interfaces/IUser";

class UserModel {
  private schema: Schema;
  private model: Model<IUser>;

  constructor() {
    this.schema = new Schema<IUser>({
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      displayName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }
      });
      
      this.model = models.User || model<IUser>('User', this.schema);
    }

    public async create(user: IUserCreation): Promise<IUser> {
      const lastUser = await this.model.findOne({}, {}, { sort: { id: -1 } });
      const nextId = (lastUser?.id || 0) + 1;
      return await this.model.create({ ...user, id: nextId });
    }

    public async findById(id: number): Promise<IUser | null> {
      return await this.model.findOne({ id });
    }

    public async findAll(): Promise<IUser[]> {
      return await this.model.find();
    }

    public async update(id: number, user: IUserCreation): Promise<IUser | null> {
      return await this.model.findOneAndUpdate({ id }, user, { new: true });
    }

    public async delete(id: number): Promise<IUser | null> {
      return await this.model.findOneAndDelete({ id });
    }
}

export default UserModel;