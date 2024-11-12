import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { HttpError } from "../utils/error.handler";

export class AuthController {
  protected authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new HttpError("Email is required", HttpError.codes.badRequest);
      }
      if (!password) {
        throw new HttpError("Password is required", HttpError.codes.badRequest);
      }
      const token = await this.authService.login(email, password);

      res
        .status(200)
        .cookie("session", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        .json({ message: "Login successful", succes: true });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
  // register = async (req: Request, res: Response) => {
  //   try {
  //   } catch (error) {}
  // };
  logout = async (_req: Request, res: Response) => {
    try {
      res.clearCookie("session").json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
}
