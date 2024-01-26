/*
  Warnings:

  - You are about to drop the column `profileId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_profileId_fkey`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `profileId`;
