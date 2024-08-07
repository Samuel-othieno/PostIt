import { Router } from "express";
import {
  createAUser,
  findAllUsers,
  userLogin,
  findUniqueUser,
  deleteAUser,
  deleteAllUsers,
  updateUserData,
} from "../Controllers/users.controller.js";
import tokenCheck from "../Utility Functions/JWT.utility.js";
import {
  validate,
  schema,
} from "../Utility Functions/dataValidation.utility.js";
import {validateUserLoginInput } from "../Middleware/UserValidation.js";
import {
  BadRequest,
  ExistingConflict,
  InternalServerError,
  NotFound,
  UnauthorizedUser,
} from "../Classes/Errors.class.js";
import { messages } from "../Messages/messages.js";

// Route Handlers----------------------------------------!
const userRouter = Router();
userRouter.post("/create", validate(schema), createAUser);
userRouter.post("/login",validateUserLoginInput, userLogin);
userRouter.post("/find", tokenCheck, findUniqueUser);
userRouter.get("/all", tokenCheck, findAllUsers);
userRouter.put("/update", tokenCheck, updateUserData);
userRouter.delete("/delete-one", tokenCheck, deleteAUser);
userRouter.delete("/delete-all", tokenCheck, deleteAllUsers);

//Middleware----------------------------------------------!
userRouter.use((error, req, res, next) => {
  if (
    error instanceof UnauthorizedUser ||
    error instanceof BadRequest ||
    error instanceof NotFound ||
    error instanceof ExistingConflict
  ) {
    return res.status(error.status).json(error.message);
  } else {
    return new InternalServerError(messages.system.ser);
  }
});
export default userRouter;