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


async function addMembersToGroup(req, res) {
  const { groupId, newMembers } = req.body;

  try {
    console.log('newMembers:', newMembers);

    if (!Array.isArray(newMembers)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Invalid input: 'newMembers' must be an array.",
      });
    }
 
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Group not found.",
      });
    }

    const newGroupMembersData = newMembers.map(userId => ({
      userId,
      role: 'Member',
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
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      error: "An error occurred while adding new members to the group.",
      details: error.message,
    });
  }
}


export{
  createNewGroup,
  addMembersToGroup
};
