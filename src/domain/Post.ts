import { IPost } from "../interfaces/IPost";

export default class Post {
  private id: number;
  private title: string;
  private content: string;
  private userId: number;
  private published: Date;
  private updated: Date;

  constructor(id: number, title: string, content: string, userId: number, published: Date, updated: Date) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.published = published;
    this.updated = updated;
  }

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getContent(): string {
    return this.content;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getPublished(): Date {
    return this.published;
  }

  public getUpdated(): Date {
    return this.updated;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public setUserId(userId: number): void {
    this.userId = userId;
  }

  public setPublished(published: Date): void {
    this.published = published;
  }

  public setUpdated(updated: Date): void {
    this.updated = updated;
  }

  public static toPostModel(post: IPost): Post {
    return new Post(post.id, post.title, post.content, post.userId, post.published, post.updated);
  }
}