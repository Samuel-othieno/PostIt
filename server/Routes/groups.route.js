import { Router } from "express";
import { createNewGroup, addMembersToGroup } from "../Controllers/groups.controller.js";

const groupRouter = Router();

groupRouter.post("/create_group", createNewGroup);
groupRouter.put("/add-member", addMembersToGroup)

export default groupRouter;
