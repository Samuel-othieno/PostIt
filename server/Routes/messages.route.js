import { Router } from "express";

import {
  BadRequest,
  ExistingConflict,
  InternalServerError,
  NotFound,
} from "../Classes/Errors.class.js";
import { unavailable } from "../Messages/success&error.messge.js";
import {
  retrievePrivateMessage,
  sendPrivateMessage,
} from "../Controllers/privateMessages.controller.js";
import { bodyValidator, validationResult } from "../Middleware/messageValidator.js";

const messageRouter = Router();

messageRouter.post("/send",bodyValidator, validationResult, sendPrivateMessage,);
messageRouter.get("/receive", retrievePrivateMessage);

// Error handler--------------------------
messageRouter.use((error, req, res, next) => {
  if (
    error instanceof BadRequest ||
    error instanceof ExistingConflict ||
    error instanceof NotFound
  ) {
    return res.status(error.status).json({ message: error.message });
  } else {
    return new InternalServerError(unavailable);
  }
});

export default messageRouter;
