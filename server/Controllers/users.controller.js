import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { schema } from "../Utility Functions/dataValidation.utility.js";
import {
  BadRequest,
  ExistingConflict,
  InternalServerError,
  NotFound,
  UnauthorizedUser,
} from "../Classes/Errors.class.js";
import { messages } from "../Messages/messages.js";

const prisma = new PrismaClient();

// User Login====================================================================================================================================================
async function userLogin(req, res) {
  const { username, email, password, phone } = req.body;


  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { phone }],
      },
    });

    if(!user){
      throw new NotFound(messages.user.notFound)
    }

    if (bcrypt.compareSync(password, user.password)) {
      let userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      };
      let token = jwt.sign(userData, process.env.JWT_SECRET1, {
        expiresIn: "32h",
      });
      return res.status(StatusCodes.OK).json({token});
    } else {
      return new BadRequest(messages.user.invalidCredentials)
    }
  } catch (error) {
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound ||
      error instanceof UnauthorizedUser
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.internalServerError);
    }
  }
}

// Create A new User ==============================================================================================================================================

async function createAUser(req, res) {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details });
  }

  const saltRounds = 10;
  const {
    email,
    phone,
    username,
    password,
    firstname,
    lastname,
    nationality,
    gender,
  } = value;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, {phone}],
      },
    });

    if (existingUser) {
      const conflictField =
        existingUser.email === email
          ? "Email"
          : existingUser.phone === phone
            ? "Phone number"
            : "Username";
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: `${conflictField} already in use`, details: messages.user.accountExists });
    }
    
    const existingProfile = await prisma.profile.findFirst({
      where: {
        AND: [{ firstname }, { lastname },],
      },
    });

    if (existingProfile) {

      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: `${firstname} ${lastname} already exists `, details: messages.user.accountExists });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        phone,
        Profile: {
          create: {
            firstname,
            lastname,
            nationality,
            gender,
          },
        },
      },
      include: {
        Profile: true,
      },
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: messages.user.created, newUser });
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
      return new InternalServerError(messages.system.internalServerError);
    }
  }
}



//                                                 *FIND OPERATIONS*                                              //
// FIND ONLY ONE User USING EMAIL AS A UNIQUE ATTRIBUTE. ==========================================================
async function findUniqueUser(req, res) {
  const { username, email, phone } = req.body;

  if (!username && !email && !phone) {
    return res.status(StatusCodes.BAD_REQUEST)
    
    .json({
      message:
        !username && !email && !phone
          ? "To find a user, use fill in their email address, Phone number or username"
          : !username
            ? "Username is required"
            : !phone
              ? "Phone number is required"
              : "Email is required",
    });
  }

  try {
    const uniqueUserExists = await prisma.user.findFirst({
      where: {
        AND: [{ username }, { email }, { phone }],
      },
      include: {
        Profile: true,
      },
    });

    return !uniqueUserExists
      ? res.status(StatusCodes.NOT_FOUND).json({ message: messages.user.notFound })
      : res
          .status(StatusCodes.OK)
          .json({uniqueUserExists});
  } catch (error) {
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound ||
      error instanceof UnauthorizedUser
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.internalServerError);
    }
  }
}

// Find all User at a Time.😊========================================================================================
async function findAllUsers(req, res) {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        Profile: true,
      },
    });
    res
      .status(StatusCodes.ACCEPTED)
      .json({allUsers});
  } catch (error) {
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound ||
      error instanceof UnauthorizedUser
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.internalServerError);
    }
  }
}

//                                                      *UPDATE OPERATIONS*                                                                              //
// Update User Data ===========================================================================================================

async function updateUserData(req, res) {
  const {
    newPhone,
    newEmail,
    newUsername,
    newPassword,
    oldPhone,
    oldEmail,
    oldUsername,
    oldPassword,
  } = req.body;

  // Check for missing fields
  if (
    !newEmail &&
    !newPhone &&
    !newUsername &&
    !newPassword &&
    !oldPhone &&
    !oldEmail &&
    !oldUsername &&
    !oldPassword
  ) {
    return BadRequest(messages.system.badRequest);
  }

  try {
    // Check for Old User data in the Database (user table)
    const oldUserData = await prisma.user.findUnique({
      where: { phone: oldPhone, email: oldEmail, username: oldUsername },
    });

    if (
      !oldUserData ||
      !oldUserData.username !== oldUsername ||
      !oldUserData.email !== oldEmail ||
      !oldUserData.phone !== oldPhone
    ) {
      !oldUserData.username
        ? "Invalid username"
        : !oldUserData.email
          ? "Invalid Email"
          : "Invalid phonenumber";
    }

    // Check for New User Data Conflicts
    const UserConflict = await prisma.user.findFirst({
      where: {
        OR: [
          { email: newEmail },
          { username: newUsername },
          { phone: newPhone },
        ],
        NOT: { id: oldUserData.id },
      },
    });

    if (UserConflict !== null && UserConflict) {
      const conflictError =
        UserConflict.email === newEmail
          ? "Email"
          : UserConflict.email
            ? "Username"
            : UserConflict.password
              ? "Password"
              : "Phone nmuber";
      return new BadRequest(`${conflictError} already in use!`);
    }

    // Update User Data
    const updatedUserData = await prisma.user.update({
      where: { id: oldUserData.id },
      data: { email: newEmail, username: newUsername, password: newPassword },
    });

    return res.status(StatusCodes.OK).json({
      message: "SUCCESS! User data updated",
      updatedUserData,
    });
  } catch (error) {
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound ||
      error instanceof UnauthorizedUser
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.internalServerError);
    }
  }
}





//                                                                 *DELETE OPERATIONS* 
// Delete a Single User at a time=====================================================================================================================================
async function deleteAUser(req, res) {
  const { email, username, phone } = req.body;

  if (!email && !username && !phone) {
    throw new BadRequest(messages.user.invalidCredentials)
  }

  try {
    const UserExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { phone }],
      },
    });

    if (!UserExists) {
      throw new NotFound(messages.user.notFound)
    } else {
      await prisma.user.delete({
        where: {
          id: UserExists.id,
        },
      });
      return res
        .status(StatusCodes.OK)
        .json({ message: "SUCCESS! User deleted" });
    }
  } catch (error) {
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound ||
      error instanceof UnauthorizedUser
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.internalServerError);
    }
  }
}

//delete All Users =========================================================================================================================================
async function deleteAllUsers(req, res) {
  try {
    const deletedUsers = await prisma.user.deleteMany();
    res
      .status(StatusCodes.OK)
      .json({ message: "SUCCESS! All Users deleted."});
  } catch (error) {
    if (
      error instanceof BadRequest ||
      error instanceof ExistingConflict ||
      error instanceof NotFound ||
      error instanceof UnauthorizedUser
    ) {
      return res.status(error.status).json({ message: error.message });
    } else {
      return new InternalServerError(messages.system.internalServerError);
    }
  }
}

//                                                                 *EXPORTS*                                                                              //
export {
  findUniqueUser,
  findAllUsers,
  updateUserData,
  createAUser,
  deleteAllUsers,
  deleteAUser,
  userLogin,
};
