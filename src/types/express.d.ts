import express from "express";
import { UserPayload } from "./Auth.types";

declare module "express" {
  export interface Request {
    user?: UserPayload;
  }
}
