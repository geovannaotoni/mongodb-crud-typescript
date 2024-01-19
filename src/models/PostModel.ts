import { Model, Schema, model, models } from "mongoose";
import { IPost, IPostCreation } from "../interfaces/IPost";

class PostModel {
  private schema: Schema;
  private model: Model<IPost>;

  constructor() {
    this.schema = new Schema<IPost>({
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      userId: {
        type: Number,
        required: true,
      },
      published: {
        type: Date,
        required: true,
      },
      updated: {
        type: Date,
        required: true,
      },
    });
    this.model = models.Post || model<IPost>('Post', this.schema);
  }

  public async create(post: IPostCreation): Promise<IPost> {
    const lastPost = await this.model.findOne({}, {}, { sort: { id: -1 } });
    const nextId = (lastPost?.id || 0) + 1;
    return await this.model.create({ 
      ...post, 
      id: nextId,
      published: new Date(),
      updated: new Date(),
    });
  }

  public async getAll(): Promise<IPost[]> {
    return await this.model.find();
  }

  public async getById(id: number): Promise<IPost | null> {
    return await this.model.findOne({ id });
  }

  public async update(id: number, post: IPostCreation): Promise<IPost | null> {
    const postUpdated = await this.model.findOneAndUpdate(
      { id },
      { ...post, updated: new Date() },
      { new: true },
    );
    return postUpdated;
  }

  public async delete(id: number): Promise<IPost | null> {
    return await this.model.findOneAndDelete({ id });
  }
}

export default PostModel;