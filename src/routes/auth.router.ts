import RouterClass from "./RouterClass";
import indexService from "../services/index.service";

const { authController } = indexService;

export class AuthRouter extends RouterClass {
  protected init(): void {
    this.post("/login", authController.login);
    // this.post("/register", authController.register);
    this.post("/logout", authController.logout);
  }
}
