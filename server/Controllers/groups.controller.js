import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import {
  NotFound,
  BadRequest,
  ExistingConflict,
  InternalServerError,
  UnauthorizedUser,
} from "../Classes/Errors.class.js";
import { messages } from "../Messages/messages.js";


const prisma = new PrismaClient();

async function createNewGroup(req, res) {
  const { groupName, datecreated, userId, members } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    const groupMembersData = members.map((memberId) => ({
      userId: memberId,
      role: "Member",
    }));

    groupMembersData.push({
      userId: user.id,
      role: "Admin",
    });

    const newGroup = await prisma.group.create({
      data: {
        name: groupName,
        createdBy: user.id,
        datecreated,
        GroupMembers: {
          create: groupMembersData,
        },
      },
      include: {
        GroupMembers: true,
      },
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: messages.group.created, newGroup });
  } catch (error) {
    console.error(error);
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound ||
      error instanceof UnauthorizedUser
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.serviceUnavailable);
    }
  }
}

async function addMembersToGroup(req, res) {
  
  const { groupId, newMembers } = req.body;
  console.log("Group:",  groupId)

  try {
    const newGroupMembersData = newMembers.map((userId) => ({
      userId,
      role: "Member",
    }));

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        GroupMembers: {
          create: newGroupMembersData,
        },
      },
      include: {
        GroupMembers: true,
      },
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "New members added successfully!", updatedGroup });
  } catch (error) {
    console.error(error);
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound ||
      error instanceof UnauthorizedUser
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.serviceUnavailable)
    }
  }
}

export { createNewGroup, addMembersToGroup };
