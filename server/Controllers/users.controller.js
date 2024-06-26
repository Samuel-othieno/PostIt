import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from 'bcrypt'
import { schema } from "../Utility Functions/dataValidation.utility.js";

const prisma = new PrismaClient();

// User Login====================================================================================================================================================
async function userLogin(req, res) {
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    const errorMessage = !username && !email ? "Username or Email" : "Password";
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `${errorMessage} is missing` });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (!user) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials, Please try again" });
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
      res.status(StatusCodes.OK).json({ message: "Success!", token });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Password or email is Incorrect",
      });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Operation failure! Please try again", details: error.message });
  }
}


// Create A new User ==============================================================================================================================================

async function createAUser(req, res) {
  
  const { error, value } = schema.validate(req.body)

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details })
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
    address
  } = value;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const conflictField = existingUser.email === email ? "Email" : 
      existingUser.phone ===phone?"Phone number":"Username";
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: `${conflictField} already in use` });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)
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
      .json({ message: "SUCCESS! New User added", newUser });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        error: "Operation failure! Please try again",
        details: error.message,
      });
  }
}


//                                                                 *FIND OPERATIONS*                                                                              //

// FIND ONLY ONE User USING EMAIL AS A UNIQUE ATTRIBUTE. ========================================================================================================
async function findUniqueUser(req, res) {
  const { username, email } = req.body;

  // Check if both username and email are missing and send a BAD_REQUEST response if so
  if (!username && !email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message:
        !username && !email
          ? "Username or Email required"
          : !username
            ? "Username is required"
            : "Email is required",
    });
  }

  try {
    const uniqueUserExists = await prisma.user.findFirst({
      where: {
        AND: [{ username }, { email }],
      },
      include: {
        Profile: true,
        Medical_records: true,
        Prescriptions: true,
      }
    });

    return !uniqueUserExists
      ? res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" })
      : res
        .status(StatusCodes.OK)
        .json({ message: "SUCCESS! User found", uniqueUserExists });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Operation failure! Please try again",
      details: error.message,
    });
  }
}

// Find all User at a Time.😊==============================================================================================================================
async function findAllUsers(req, res) {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        Profile: true,
      }
    });
    res
      .status(StatusCodes.ACCEPTED)
      .json({ message: "SUCCESS! Users found", allUsers });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Operation failure! Please try again", details: error.message });
  }
}

//                                                                 *UPDATE OPERATIONS*                                                                              //
// Update User Data ===============================================================================================================================================

async function updateUserData(req, res) {
  const {
    newEmail,
    newUsername,
    newPassword,
    oldEmail,
    oldUsername,
    oldPassword,
  } = req.body;

  // Check for missing fields
  if (
    !newEmail ||
    !newUsername ||
    !newPassword ||
    !oldEmail ||
    !oldUsername ||
    !oldPassword
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Fill in all the required fields to proceed.",
    });
  }

  try {
    // Check for Old User data in the Database (user table)
    const oldUserData = await prisma.user.findUnique({
      where: { email: oldEmail, username: oldUsername },
    });

    if (!oldUserData || oldUserData.password !== oldPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Incorrect old User data, please try again.",
      });
    }

    // Check for New User Data Conflicts
    const UserConflict = await prisma.user.findFirst({
      where: {
        OR: [{ email: newEmail }, { username: newUsername }],
        NOT: { id: oldUserData.id },
      },
    });

    if (UserConflict) {
      const conflictError =
        UserConflict.email === newEmail ? "Email" : "Username";
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `${conflictError} already in use!` });
    }

    if (newPassword === oldPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Please, use a password you have not used before!",
      });
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
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Operation Failure!",
      details: error.message,
    });
  }
}

//                                                                 *DELETE OPERATIONS*                                                                              //

// Delete a Single User at a time=====================================================================================================================================
async function deleteAUser(req, res) {
  const { email, username } = req.body;

  if (!email && !username) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Email or Username required, try again!",
    });
  }

  try {
    const UserExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (!UserExists) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Operation failure! Please try again",
      details: error.message,
    });
  }
}

//delete All Users =========================================================================================================================================
async function deleteAllUsers(req, res) {
  try {
    const deletedUsers = await prisma.user.deleteMany();

    res
      .status(StatusCodes.OK)
      .json({ message: "SUCCESS! All Users deleted.", deletedUsers });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Operation failure! Please try again",
      details: error.message,
    });
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