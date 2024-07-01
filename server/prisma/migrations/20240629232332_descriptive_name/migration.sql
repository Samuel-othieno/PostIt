/*
  Warnings:

  - You are about to drop the column `date_Of_Birth` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "date_Of_Birth",
ADD COLUMN     "gender" "Gender" NOT NULL;
