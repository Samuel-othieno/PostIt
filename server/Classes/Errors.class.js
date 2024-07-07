import { StatusCodes } from "http-status-codes";

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.status = StatusCodes.NOT_FOUND;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = "InvaidUser";
    this.status = StatusCodes.BAD_REQUEST;
  }
}

class ExistingConflict extends Error {
  constructor(message) {
    super(message);
    this.name = "ExistingConflict";
    this.status = StatusCodes.CONFLICT;
  }
}

class UnauthorizedUser extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedUser";
    this.status = "StatusCodes.UNAUTHORIZED";
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.status = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export {
  NotFound,
  BadRequest,
  ExistingConflict,
  UnauthorizedUser,
  InternalServerError,
};
