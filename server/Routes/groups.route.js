import { Router } from "express";
import createNewGroup from "../Controllers/groups.controller.js";

const groupRouter = Router();

groupRouter.post('/create_group', createNewGroup)

export default groupRouter;