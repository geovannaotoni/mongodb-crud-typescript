export interface IPost {
  id: number;
  title: string,
  content: string,
  userId: number,
  published: Date,
  updated: Date,
}

export interface IPostCreation {
  title: string,
  content: string,
  userId: number,
}