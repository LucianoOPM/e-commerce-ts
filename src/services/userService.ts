import { ApiError } from "../errors/ApiError";
import {
  IUserRepository,
  IUserService,
  IUser,
  NewUser,
  UpdateUser,
} from "../types/Users.types";
import { CryptPassword } from "../utils/bcrypt";

//El service es el encargado de interconectar el controlador y el repository
export class UserService implements IUserService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async createUser(user: NewUser): Promise<IUser> {
    const userEmail = await this.userRepository.findByEmail(user.email);
    const userName = await this.userRepository.findByUsername(user.username);
    if (userEmail || userName) {
      throw ApiError.badRequest("User already exists");
    }
    const newPassword = CryptPassword.hashPassword(user.password);
    return await this.userRepository.create({ ...user, password: newPassword });
  }
  async findUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }
  async findById(id: string): Promise<IUser | undefined | null> {
    return await this.userRepository.findById(id);
  }
  async updateUser(
    id: string,
    data: UpdateUser
  ): Promise<IUser | null | undefined> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw ApiError.badRequest("User not found");
    }
    return await this.userRepository.update(id, data);
  }
}
