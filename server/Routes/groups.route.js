import { Router } from "express";
import { createNewGroup, addMembersToGroup } from "../Controllers/groups.controller.js";
import { checkExistingGroupMember, checkIfGroupExists, checkNonExistingGroup, validateGroupCreation } from "../Middleware/GroupsValidation.js";
import checkExistingUser from "../Middleware/UserValidation.js";
import { BadRequest,ExistingConflict,NotFound } from "../Classes/Errors.class.js";

const groupRouter = Router();

groupRouter.post("/create_group",[checkExistingUser, validateGroupCreation, checkIfGroupExists],  createNewGroup);
groupRouter.put("/add-member", [checkNonExistingGroup,checkExistingGroupMember], addMembersToGroup)

groupRouter.use((error, req, res, next)=>{
    if(error instanceof BadRequest || error instanceof ExistingConflict || error instanceof NotFound){
        return res
        .status(error.status)
        .json({message: error.message})
    }
})

export default groupRouter;
