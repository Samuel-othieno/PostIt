import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import {
  NotFound,
  BadRequest,
  InternalServerError,
} from "../Classes/Errors.class.js";
import { messages } from "../Messages/messages.js";

const prisma = new PrismaClient();

async function sendMessageTogroup(req, res) {
  const {groupId} = req.params;
  const { userId, content } = req.body;

  try {
    const parsedGroupId = parseInt(groupId);

    const group = await prisma.group.findUnique({
      where: {id: parsedGroupId},
    });

    if (!group) {
      return new NotFound(messages.group.groupDeleted);
    }

    const isMember = await prisma.groupMembers.findUnique({
        where:{
            groupId_userId:{
                groupId: parsedGroupId,
                userId: userId,
            },
        },
    });

    if (!isMember){
        return res .status(StatusCodes.FORBIDDEN).json({message:"User is not a member of the Group"})
    }

    const message = await prisma.groupMessages.create({
      data: {
        groupId: parsedGroupId,
        userId,
        content,
      },
    });
    return res.status(StatusCodes.CREATED).json(message);
  } catch (error) {
    console.error(error);
    if (error instanceof NotFound || error instanceof BadRequest) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.serviceUnavailable);
    }
  }
}

async function retrieveGroupMessages(req, res) {
  const { groupId } = req.params;
  try {
    const messages = await prisma.groupMessages.findMany({
      where: {
        groupId: parseInt(groupId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(StatusCodes.OK).json({ messages });
  } catch (error) {
    if (error instanceof NotFound || error instanceof BadRequest) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.serviceUnavailable);
    }
  }
}

export { sendMessageTogroup, retrieveGroupMessages };
