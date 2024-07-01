import { Router } from "express";
import { createAUser, findAllUsers, userLogin } from "../Controllers/users.controller.js";
import { StatusCodes } from "http-status-codes";
import tokenCheck from "../Utility Functions/JWT.utility.js";
import { token } from "morgan";
import {validate, schema } from "../Utility Functions/dataValidation.utility.js";

const userRouter = Router()
userRouter.post('/create', validate(schema), createAUser)
export default userRouter;