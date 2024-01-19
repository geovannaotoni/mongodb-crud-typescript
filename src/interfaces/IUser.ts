export interface IUser {
  id: number;
  displayName: string,
  email: string,
  password: string,
}

export interface IUserCreation {
  displayName: string,
  email: string,
  password: string,
}