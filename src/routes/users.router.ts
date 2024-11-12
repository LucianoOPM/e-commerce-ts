import RouterClass from "./RouterClass";
import indexService from "../services/index.service";
import { UpdateUser } from "../types/Users.types";

const { userController } = indexService;

class UserRouter extends RouterClass {
  constructor() {
    super();
  }

  protected init(): void {
    this.get("/", ["ADMIN"], userController.getUsers);
    this.get("/:id", ["PUBLIC"], userController.getUsers);
    this.post("/", userController.createUser);
    this.put<{ id: string }, {}, UpdateUser>("/:id", userController.updateUser);
    this.delete("/:id", userController.deleteUser);
  }
}

export default UserRouter;
