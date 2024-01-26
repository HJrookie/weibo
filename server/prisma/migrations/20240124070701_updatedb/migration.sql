/*
  Warnings:

  - You are about to alter the column `blogCreateAt` on the `Blog` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Int`.

*/
-- AlterTable
ALTER TABLE `Blog` MODIFY `blogCreateAt` INTEGER NOT NULL DEFAULT 0;
