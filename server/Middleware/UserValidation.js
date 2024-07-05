import {
    BadRequest,
    NotFound,
    ExistingConflict,
} from "../Classes/Errors.class.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkExistingUser(req, res, next) {
    const { userId } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return next(new NotFound(`${userId} not found`));
        }

        next();
    } catch (error) {
        next(error);
    }
}

function validateUserLoginInput(req, res, next) {
    const { username, email, phone } = req.body;

    if ((!username && !email && !phone) || !password) {
        const errorMessage =
            !username && !email && !phone
                ? "Username, phonenumber or Email"
                : "Password";

        return next(BadRequest(`${errorMessage} is missing!`));
    }
    next();
}



export { checkExistingUser, validateUserLoginInput };
