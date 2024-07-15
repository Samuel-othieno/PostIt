/*
  Warnings:

  - A unique constraint covering the columns `[groupId,userId]` on the table `GroupMembers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupMembers_groupId_userId_key" ON "GroupMembers"("groupId", "userId");
