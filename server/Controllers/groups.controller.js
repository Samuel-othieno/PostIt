import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();


async function createNewGroup (req, res){
    const {groupName, userIds} = req.body;

    try {
        if(!groupName){
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({error: "Group name required!"})
        }
        

        const existingGroup = await prisma.group.findFirst({
            where: {
              OR: [{ name: groupName }],
            },
        });

        if (existingGroup) {
            return res
              .status(StatusCodes.CONFLICT)
              .json({ message: 'Group already in Exists' });
          }

          if( !req.user || !req.user.id){
            return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error:"An error occurred while creating the group.", details: error.message})
          }

        const newGroup = await prisma.group.create({
            data:{
                name: groupName,
                createdBy: req.user.id,
                GroupMembers:{
                    create: userIds.map(userId=>({
                        members:{
                            connect:{id: userId}
                        }
                    }))
                },
                include:{
                    GroupMembers: true
                }
            }
        });
        return res
        .status(StatusCodes.OK)
        .json({message:"Group created successful!", newGroup})
    } catch (error) {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({error:"An error occurred while creating the group.", details: error.message})
    }

}



export default createNewGroup;