/*
  Warnings:

  - You are about to drop the column `fengmianVideoId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `previewImageVideoId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `src` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `prevName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `fielPath` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `vvId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_fengmianVideoId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_previewImageVideoId_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `fengmianVideoId`,
    DROP COLUMN `name`,
    DROP COLUMN `previewImageVideoId`,
    DROP COLUMN `src`,
    ADD COLUMN `profileId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `bio`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `followersCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `prevName`;

-- AlterTable
ALTER TABLE `Video` DROP COLUMN `code`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `fielPath`,
    DROP COLUMN `note`,
    DROP COLUMN `size`,
    DROP COLUMN `status`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `vvId`;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NULL,
    `isLongText` BOOLEAN NOT NULL DEFAULT false,
    `viewCount` INTEGER NOT NULL DEFAULT 0,
    `authorId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Image_profileId_key` ON `Image`(`profileId`);

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
