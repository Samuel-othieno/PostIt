import { createUser, loginUser } from "./user.js";
import { createGroup, addUserToGroup } from "./group.js";

createUser("username", "email@example.com", "password");
createGroup("Group Name");