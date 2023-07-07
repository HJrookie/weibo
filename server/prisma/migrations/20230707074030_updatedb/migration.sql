/*
  Warnings:

  - Made the column `uid` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Profile` MODIFY `uid` VARCHAR(191) NOT NULL;
