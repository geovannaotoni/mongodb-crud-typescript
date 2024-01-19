import Post from "../domain/Post";
import { IPostCreation } from "../interfaces/IPost";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import PostModel from "../models/PostModel";

export default class PostService {
  constructor(
    private postModel = new PostModel(),
  ) {}

  public async create(post: IPostCreation): Promise<ServiceResponse<Post>> {
    const newPost = await this.postModel.create(post);
    return { 
      status: "CREATED",
      data: Post.toPostModel(newPost),
    }
  }

  public async getAll(): Promise<ServiceResponse<Post[]>> {
    const posts = await this.postModel.getAll();
    return {
      status: "SUCCESSFUL",
      data: posts.map(post => Post.toPostModel(post)),
    }
  }

  public async getById(id: number): Promise<ServiceResponse<Post>> {
    const post = await this.postModel.getById(id);
    if (post) {
      return {
        status: "SUCCESSFUL",
        data: Post.toPostModel(post),
      }
    }
    return {
      status: "NOT_FOUND",
      data: { message: 'Post not found' } 
    }
  }

  public async update(id: number, post: IPostCreation): Promise<ServiceResponse<Post>> {
    const updatedPost = await this.postModel.update(id, post);
    if (updatedPost) {
      return {
        status: "SUCCESSFUL",
        data: Post.toPostModel(updatedPost),
      }
    }
    return {
      status: "NOT_FOUND",
      data: { message: 'Post not found' } 
    }
  }

  public async delete(id: number): Promise<ServiceResponse<Post>> {
    const deletedPost = await this.postModel.delete(id);
    if (deletedPost) {
      return {
        status: "SUCCESSFUL",
        data: Post.toPostModel(deletedPost),
      }
    }
    return {
      status: "NOT_FOUND",
      data: { message: 'Post not found' } 
    }
  }
}