import { BadRequest, NotFound } from "../Classes/Errors.class.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


function validateUserLoginInput(req, res, next) {
  const { username, email, phone, password } = req.body;

  if ((!username && !email && !phone) || !password) {
    const errorMessage =
      !username && !email && !phone
        ? "Username, phonenumber or Email"
        : "Password";

    return next(BadRequest(`${errorMessage} is missing!`));
  }
  next();
}

export { validateUserLoginInput};
