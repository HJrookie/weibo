/*
  Warnings:

  - The `blogCreateAt` column on the `Blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `Blog` DROP COLUMN `blogCreateAt`,
    ADD COLUMN `blogCreateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
