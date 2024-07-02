import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();


async function createNewGroup (req, res){
    const {groupName, userId} = req.body; 

    try {
        const user = await prisma.user.findFirst({
            where:{id: userId}
        }) 

        console.log("UDFFD:", user)

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

          if(!user){
            throw new Error("An error occurred while creating the group.")
          }

        const newGroup = await prisma.group.create({
            data:{
                name: groupName,
                createdBy: user.id,
                GroupMembers:{
                    create:{
                        id:userId,
                        members:{
                            connect:{id: user.id}
                        }
                    }
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
        console.log(error)
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({error:"An error occurred while creating the group.", details: error.message})
    }

}



export default createNewGroup;