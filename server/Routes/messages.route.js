import { Router } from "express";

import {
  BadRequest,
  ExistingConflict,
  InternalServerError,
  NotFound,
} from "../Classes/Errors.class.js";
import {
  retrievePrivateMessage,
  sendPrivateMessage,
} from "../Controllers/privateMessages.controller.js";
import {
  bodyValidator,
} from "../Middleware/messageValidator.js";
import { messages } from "../Messages/messages.js";



// Route handlers.........................
const messageRouter = Router();

messageRouter.post(
  "/private-message",
  bodyValidator,
  sendPrivateMessage,
);
messageRouter.get("/private-messages/:userId", retrievePrivateMessage);

// Error handler--------------------------
messageRouter.use((error, req, res, next) => {
  if (
    error instanceof BadRequest ||
    error instanceof ExistingConflict ||
    error instanceof NotFound
  ) {
    return res.status(error.status).json({ message: error.message });
  } else {
    return new InternalServerError(messages.system.serviceUnavailable);
  }
});

export default messageRouter;
