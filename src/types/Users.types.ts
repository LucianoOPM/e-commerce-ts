import { Repository } from "./Repository.types";
import { Types } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  email: string;
  rol: "user" | "admin" | "premium";
  first_name: string;
  last_name: string;
  birthdate: Date;
  cart: Types.ObjectId;
}

export interface NewUser
  extends Pick<
    IUser,
    "birthdate" | "email" | "first_name" | "last_name" | "password" | "username"
  > {}
export interface UpdateUser extends Partial<IUser> {}

export interface IUserRepository
  extends Repository<IUser, NewUser, UpdateUser> {
  findByEmail(email: string): Promise<IUser | undefined | null>;
  findByUsername(username: string): Promise<IUser | undefined | null>;
}

export interface IUserService {
  createUser(user: NewUser): Promise<IUser>;
  findUsers(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null | undefined>;
  updateUser(id: string, data: UpdateUser): Promise<IUser | null | undefined>;
}
