/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `uid` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_uid_key` ON `Profile`(`uid`);
