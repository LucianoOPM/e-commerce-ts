/**
 * Controller > Service > Repository > conexion DB
 */

import UserController from "../controllers/user.controller";
import { UserService } from "./userService";
import { UserRepository } from "../repository/userRepository";
import UserModel from "../models/user.model";
import { AuthService } from "./auth.service";
import { AuthController } from "../controllers/auth.controller";

export default {
  userController: new UserController(
    new UserService(new UserRepository(UserModel))
  ),
  authController: new AuthController(
    new AuthService(new UserRepository(UserModel))
  ),
};
