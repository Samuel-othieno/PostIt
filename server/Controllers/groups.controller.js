import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import {
  NotFound,
  BadRequest,
  ExistingConflict,
} from "../Classes/Errors.class.js";

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
      .json({ message: "Group created successful!", newGroup });
  } catch (error) {
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Service is temporarily down" });
    }
  }
}

async function addMembersToGroup(req, res) {
  const { groupId, newMembers } = req.body;
  console.log(req.body);

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
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Service is temporarily down" });
    }
  }
}

export { createNewGroup, addMembersToGroup };
