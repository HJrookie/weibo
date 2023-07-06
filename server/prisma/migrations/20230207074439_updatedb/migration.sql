/*
  Warnings:

  - You are about to drop the column `uuid` on the `Video` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Video_uuid_key` ON `Video`;

-- AlterTable
ALTER TABLE `Video` DROP COLUMN `uuid`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `size` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
