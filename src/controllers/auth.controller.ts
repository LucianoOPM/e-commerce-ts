import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ApiError } from "../errors/ApiError";

export class AuthController {
  protected authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw ApiError.badRequest("Email is required");
      }
      if (!password) {
        throw ApiError.badRequest("Password is required");
      }
      const token = await this.authService.login(email, password);

      res
        .status(200)
        .cookie("session", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        .json({ message: "Login successful", succes: true });
    } catch (error) {
      next(error);
    }
  };
  // register = async (req: Request, res: Response) => {
  //   try {
  //   } catch (error) {}
  // };
  logout = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("session").json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  };
}
