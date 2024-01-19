import { IUser } from "../interfaces/IUser";

export default class User {
    private id: number;
    private displayName: string;
    private email: string;
    private password: string;

    constructor(id: number, displayName: string, email: string, password: string) {
        this.id = id;
        this.displayName = displayName;
        this.email = email;
        this.password = password;
    }

    public getId(): number {
        return this.id;
    }

    public getDisplayName(): string {
        return this.displayName;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setDisplayName(displayName: string): void {
        this.displayName = displayName;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public static toUserModel(user: IUser): User {
        return new User(user.id, user.displayName, user.email, user.password);
    }
}