import { Router } from "express";
import { createNewGroup, addMembersToGroup } from "../Controllers/groups.controller.js";
import { checkExistingGroupMember, checkIfGroupExists, checkNonExistingGroup, validateGroupCreation } from "../Middleware/GroupsValidation.js";
import { checkForAnExistingUser } from "../Middleware/UserValidation.js";
import { BadRequest,ExistingConflict,InternalServerError,NotFound } from "../Classes/Errors.class.js";
import { unavailable } from "../Messages/success&error.messge.js";

const groupRouter = Router();

groupRouter.post("/create_group",[checkForAnExistingUser, validateGroupCreation, checkIfGroupExists],  createNewGroup);
groupRouter.put("/add-member", [checkForAnExistingUser], addMembersToGroup)


// Error handler--------------------------
groupRouter.use((error, req, res, next)=>{
    if(error instanceof BadRequest || error instanceof ExistingConflict || error instanceof NotFound){
        return res
        .status(error.status)
        .json({message: error.message})
    }else{
        return new InternalServerError(unavailable)
    }
})

export default groupRouter;
