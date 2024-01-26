/*
  Warnings:

  - You are about to drop the column `education` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `realName` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[blogId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `blogId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` ADD COLUMN `blogId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `education`,
    DROP COLUMN `realName`;

-- CreateIndex
CREATE UNIQUE INDEX `Image_blogId_key` ON `Image`(`blogId`);

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
