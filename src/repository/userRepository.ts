import { ApiError } from "../errors/ApiError";
import UserModel from "../models/user.model";
import {
  IUserRepository,
  IUser,
  NewUser,
  UpdateUser,
} from "../types/Users.types";

export class UserRepository implements IUserRepository {
  private userModel: typeof UserModel;
  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }
  async create(data: NewUser): Promise<IUser> {
    try {
      return await this.userModel.create(data);
    } catch (error) {
      throw ApiError.badRequest("Error creating user");
    }
  }
  async findAll(): Promise<IUser[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw ApiError.internal("Error finding users");
    }
  }
  async findById(id: string): Promise<IUser | undefined | null> {
    return await this.userModel.findById(id);
  }
  async delete(id: string): Promise<IUser | null | undefined> {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw ApiError.internal("Error deleting user");
    }
  }
  async update(
    id: string,
    data: UpdateUser
  ): Promise<IUser | null | undefined> {
    try {
      return await this.userModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw ApiError.internal("Error updating user");
    }
  }
  async findByEmail(email: string): Promise<IUser | undefined | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw ApiError.internal("Error finding user");
    }
  }
  async findByUsername(username: string): Promise<IUser | undefined | null> {
    try {
      return await this.userModel.findOne({ username });
    } catch (error) {
      throw ApiError.internal("Error finding user");
    }
  }
}
