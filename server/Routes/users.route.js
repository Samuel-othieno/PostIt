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

const userRouter = Router();
userRouter.post("/create", validate(schema), createAUser);
userRouter.post("/login", userLogin);
userRouter.post("/find", tokenCheck, findUniqueUser);
userRouter.get("/all", tokenCheck, findAllUsers);
userRouter.put("/update", tokenCheck, updateUserData);
userRouter.delete("/delete-one", tokenCheck, deleteAUser);
userRouter.delete("/delete-all", tokenCheck, deleteAllUsers);

export default userRouter;
