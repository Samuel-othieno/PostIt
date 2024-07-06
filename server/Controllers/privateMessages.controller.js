import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NotFound, BadRequest, ExistingConflict, InternalServerError } from "../Classes/Errors.class.js";
import { unavailable } from "../Messages/success&error.messge.js";

const prisma = new PrismaClient();

async function sendPrivateMessage(req, res){
    const {senderId, receiverId, content} = req.body;
    try {
        const message = await prisma.directmessages.create({
            data:{
                senderId,
                receiverId,
                content
            }
        })
        return res
        .status(StatusCodes.CREATED)
        .json({message})
    } catch (error) {
        if (error instanceof NotFound || error instanceof BadRequest) {
            return res
            .status(error.status)
            .json({message: error.message})
        } else {
            InternalServerError(unavailable)
        }
    }
}


async function retrievePrivateMessage(req, res){
    const {userId} = req.params;
    try {
        const messages = await prisma.directmessages.findMany({
           where:{
            OR:[
                {senderId: parseInt(userId)},
                {receiverId: parseInt(userId)},
            ],
           },
           orderBy:{
            createdAt: 'desc',
           },
        })
        return res
        .status(StatusCodes.OK)
        .json({messages})
    } catch (error) {
        if (error instanceof NotFound || error instanceof BadRequest) {
            return res
            .status(error.status)
            .json({message: error.message})
        } else {
            return new InternalServerError(unavailable)
        }
    }
}

export{
    sendPrivateMessage,
    retrievePrivateMessage
}