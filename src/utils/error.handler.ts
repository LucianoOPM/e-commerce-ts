export class HttpError extends Error {
  static codes = {
    badRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    notFound: 404,
    internalServerError: 500,
  };
  constructor(message: string, public statusCode: number, name?: string) {
    super(message);
    this.name = name || "HttpError";
    this.statusCode = statusCode;
  }
  static NotFound(message: string = "Not Found") {
    return new HttpError(message, this.codes.notFound, "Not Found");
  }
  static BadRequest(message: string = "bad_request") {
    return new HttpError(message, this.codes.badRequest, "bad_request");
  }
  static Unauthorized(message: string = "Unauthorized") {
    return new HttpError(message, this.codes.Unauthorized, "Unauthorized");
  }
  static Forbidden(message: string = "Forbidden") {
    return new HttpError(message, this.codes.Forbidden, "Forbidden");
  }
  static InternalServerError(message: string = "Internal Server Error") {
    return new HttpError(
      message,
      this.codes.internalServerError,
      "Internal Server Error"
    );
  }
}
