import { NextFunction, Request, Response } from "express";
import { IUserService, NewUser, UpdateUser } from "../types/Users.types";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../errors/ApiError";

//El controlador es el encargado de recibir la peticion HTTP y mandar la información al service
export default class UserController {
  protected service: IUserService;
  constructor(service: IUserService) {
    this.service = service;
  }

  getUsers = async (_req: Request, res: Response) => {
    try {
      const data = await this.service.findUsers();
      res.status(200).json({ message: "Request accepted", data });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  createUser = async (
    req: Request<{}, {}, NewUser>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, email, password, first_name, last_name, birthdate } =
        req.body;
      if (!username || !username.trim()) {
        throw ApiError.badRequest("Username is required");
      }
      if (!email || !email.trim()) {
        throw ApiError.badRequest("Email is required");
      }
      if (!password || !password.trim()) {
        throw ApiError.badRequest("Password is required");
      }
      if (!first_name || !first_name.trim()) {
        throw ApiError.badRequest("First name is required");
      }
      if (!last_name || !last_name.trim()) {
        throw ApiError.badRequest("Last name is required");
      }
      if (!birthdate) {
        throw ApiError.badRequest("Birthdate is required");
      }
      const user = await this.service.createUser({
        username,
        email,
        password,
        first_name,
        last_name,
        birthdate,
      });
      res.status(200).json({ message: "created", user });
    } catch (error) {
      next(error);
    }
  };
  updateUser = async (
    req: Request<{ id: string }, {}, UpdateUser>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { username, first_name, last_name, birthdate, cart } = req.body;
      const data: UpdateUser = {};
      if (username && username.trim()) {
        data.username = username;
      }
      if (first_name && first_name.trim()) {
        data.first_name = first_name;
      }
      if (last_name && last_name.trim()) {
        data.last_name = last_name;
      }
      if (birthdate) {
        data.birthdate = birthdate;
      }
      if (cart && isValidObjectId(cart)) {
        data.cart = cart;
      }
      if (Object.keys(data).length === 0) {
        throw ApiError.badRequest("No data to update");
      }
      const updatedUser = await this.service.updateUser(id, data);
      res.status(200).json({ message: "user updated", data: updatedUser });
    } catch (error) {
      next(error);
    }
  };
  deleteUser = async (req: Request, res: Response) => {
    try {
      const { idUser } = req.params;
      res.status(200).json({ message: "deleted", idUser });
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
