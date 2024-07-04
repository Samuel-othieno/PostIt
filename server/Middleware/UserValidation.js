import { BadRequest, NotFound, ExistingConflict } from "../Classes/Errors.class.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkExistingUser(req, res, next) {

    const {userId} = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: { id: userId },
        });
    
        if (!user) {
            return next(new NotFound(`${userId} not found`))
        } 

        next()

    } catch (error) {
        next(error)
    }
}

export default checkExistingUser;