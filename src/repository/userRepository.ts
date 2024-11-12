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
    return await this.userModel.create(data);
  }
  async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }
  async findById(id: string): Promise<IUser | undefined | null> {
    return await this.userModel.findById(id);
  }
  async delete(id: string): Promise<IUser | null | undefined> {
    return await this.userModel.findByIdAndDelete(id);
  }
  async update(
    id: string,
    data: UpdateUser
  ): Promise<IUser | null | undefined> {
    return await this.userModel.findByIdAndUpdate(id, data, { new: true });
  }
  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
  async findByUsername(username: string): Promise<IUser | undefined | null> {
    return await this.userModel.findOne({ username });
  }
}
