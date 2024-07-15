import {
  BadRequest,
  ExistingConflict,
  NotFound,
} from "../Classes/Errors.class.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// For All Group Creations =============================================
function validateGroupCreation(req, res, next) {
  const { groupName, members } = req.body;

  if (!Array.isArray(members)) {
    throw new BadRequest(
      `Invalid members format. ${members} must be an array.`,
    );
  }

  if (!groupName) {
    throw new BadRequest("Group name required!");
  }

  next();
}

function validateNewGroupMember(req, res, next) {
  const { newMembers } = req.body;
  if (!Array.isArray(newMembers)) {
    return next(
      new BadRequest(`Invalid input ${newMembers} must be an array.`),
    );
  }

  next();
}

// Fpr new group members****************************
async function checkForAnExistingUser(req, res, next) {
  const {newMembers, groupId} = req.body;

  try {
    const newMembers = await prisma.user.findUnique({
      where: { id: newMembers},
    });

    if (!newMembers) {
      return next(new NotFound(`${newMembers} not found`));
    }

    next();
  } catch (error) {
    next(error);
  }
}

// For Group Creation*******************************
async function checkIfGroupExists(req, res, next) {
  const { groupName, groupId, newMembers} = req.body;
  try {
    const existingGroup = await prisma.group.findFirst({
      where: {
        OR: [{ id: groupId }, { name: groupName }],
      },
    });

    if (existingGroup) {
      return next(
        new ExistingConflict(`${existingGroup.name} already exists.`),
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function checkNonExistingGroup(req, res, next) {
  const { groupId } = req.params;

  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return next(new BadRequest(`${group.name} not found`));
    }
  } catch (error) {
    next(error);
  }
}

async function checkExistingGroupMember(req, res, next) {
  const { newMembers, username, userId, groupId, groupName } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: newMembers }, { id: userId }],
      },
    });

    const group = await prisma.group.findFirst({
      where: {
        OR: [{ id: groupId }, { name: groupName }],
      },
    });

    const groupMember = await prisma.groupMembers.findMany({
      where: {
        AND: [{ groupId: groupId }, { userId: userId }],
      },
    });

    if (groupMember) {
      return next(
        new ExistingConflict(
          `${user.username} is already a member of ${groupName}`,
        ),
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}

export {
  validateGroupCreation,
  checkExistingGroupMember,
  checkIfGroupExists,
  validateNewGroupMember,
  checkNonExistingGroup,
};
