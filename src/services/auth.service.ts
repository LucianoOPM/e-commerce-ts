import { UserRepository } from "../repository/userRepository";
import { IAuthService } from "../types/Auth.types";
import { CryptPassword } from "../utils/bcrypt";
import { sign } from "jsonwebtoken";
import config from "../config/config";
import { ApiError } from "../errors/ApiError";

export class AuthService implements IAuthService {
  protected userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw ApiError.badRequest("Invalid credentials");
    }
    const validPassword = CryptPassword.comparePassword(
      password,
      user.password
    );
    if (!validPassword) {
      throw ApiError.badRequest("Invalid credentials");
    }
    const data = {
      email: user.email,
      username: user.username,
      birthdate: user.birthdate,
      id: user._id,
      rol: user.rol,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    const token = sign(data, config.JWT_SECRET, { expiresIn: "24h" });
    return token;
  }
}
