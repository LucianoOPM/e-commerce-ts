import { Request, Response, Router } from "express";
import UserRouter from "./users.router";
import { AuthRouter } from "./auth.router";

const router = Router();

const userRouter = new UserRouter();
const authRouter = new AuthRouter();

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});
router.use("/users", userRouter.getRouter());
router.use("/auth", authRouter.getRouter());
router.use("*", (_req, res) => {
  res.status(404).json({ message: "Not found" });
});

export default router;
