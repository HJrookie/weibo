/*
  Warnings:

  - Added the required column `downloadState` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Image` ADD COLUMN `downloadState` INTEGER NOT NULL,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL DEFAULT '';
