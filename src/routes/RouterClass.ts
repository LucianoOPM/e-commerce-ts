import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import { ParamsDictionary } from "express-serve-static-core"; // Importa ParamsDictionary desde aquí
import { verify } from "jsonwebtoken";
import config from "../config/config";
import { UserPayload } from "../types/Auth.types";

abstract class RouterClass {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  protected abstract init(): void;

  protected applyCallbacks<
    P extends ParamsDictionary = ParamsDictionary,
    ResBody = any,
    ReqBody = any
  >(
    callbacks: RequestHandler<P, ResBody, ReqBody>[]
  ): RequestHandler<P, ResBody, ReqBody> {
    return (
      req: Request<P, ResBody, ReqBody>,
      res: Response<ResBody>,
      next: NextFunction
    ) => {
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](req, res, next);
      }
    };
  }

  handlePolicies = (policies: string[]) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        if (policies[0] === "PUBLIC") return next();

        let token;

        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies && req.cookies["session"]) {
          token = req.cookies["session"];
        }
        if (!token) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
        const decoded = verify(token, config.JWT_SECRET) as UserPayload;

        if (!policies.includes(decoded.rol.toUpperCase())) {
          res.status(403).json({ message: "Forbidden" });
          return;
        }
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
      }
    };
  };

  protected get<
    P extends ParamsDictionary = ParamsDictionary,
    ResBody = any,
    ReqBody = any
  >(
    path: string,
    policies: string[],
    ...callbacks: RequestHandler<P, ResBody, ReqBody>[]
  ): void {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.applyCallbacks(callbacks)
    );
  }

  protected post<
    P extends ParamsDictionary = ParamsDictionary,
    ResBody = any,
    ReqBody = any
  >(path: string, ...callbacks: RequestHandler<P, ResBody, ReqBody>[]): void {
    this.router.post(path, this.applyCallbacks(callbacks));
  }

  protected put<
    P extends ParamsDictionary = ParamsDictionary,
    ResBody = any,
    ReqBody = any
  >(path: string, ...callbacks: RequestHandler<P, ResBody, ReqBody>[]): void {
    this.router.put(path, this.applyCallbacks(callbacks));
  }

  protected delete<
    P extends ParamsDictionary = ParamsDictionary,
    ResBody = any,
    ReqBody = any
  >(path: string, ...callbacks: RequestHandler<P, ResBody, ReqBody>[]): void {
    this.router.delete(path, this.applyCallbacks(callbacks));
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default RouterClass;
