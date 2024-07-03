import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

async function createNewGroup(req, res) {
  const { groupName, datecreated, userId, members} = req.body;

  try {
    
    if(!Array.isArray(members)){
      return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        error: "Invalid members format. 'Members' must be an array."
      })
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error("User not found");
    }

    if (!groupName) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Group name required!" });
    }

    const existingGroup = await prisma.group.findFirst({
      where: {
        name: groupName 
      },
    });

    if (existingGroup) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Group already in Exists" });
    }

    const groupMembersData = members.map(memberId => ({
      userId: memberId,
      role: 'Member'
    }))

    groupMembersData.push({
      userId: user.id,
      role: 'Admin'
    })

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
    console.log(error);
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      error: "An error occurred while creating the group.",
      details: error.message,
    });
  }
}

export default createNewGroup;
