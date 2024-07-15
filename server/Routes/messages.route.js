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
import { bodyValidator, groupBodyValidator } from "../Middleware/messageValidator.js";
import { messages } from "../Messages/messages.js";
import {
  retrieveGroupMessages,
  sendMessageTogroup,
} from "../Controllers/groupMessages.controller.js";
import { checkNonExistingGroup } from "../Middleware/GroupsValidation.js";

// Route handlers.........................
const messageRouter = Router();

messageRouter.post("/private-message", bodyValidator, sendPrivateMessage);
messageRouter.get("/private-messages/:userId", retrievePrivateMessage);
messageRouter.post("/group/:groupId/messages",groupBodyValidator, sendMessageTogroup);
messageRouter.get("/group-messages/:groupId/messages", retrieveGroupMessages);

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
