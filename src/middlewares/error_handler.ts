import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import fs from "node:fs/promises";

export const errorHandler = async (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  await fs.mkdir("logs", { recursive: true });
  await fs.appendFile(
    "logs/error.log",
    `${new Date().toISOString()} - ${err.message}\n`
  );

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
