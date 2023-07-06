-- AlterTable
ALTER TABLE `Video` ADD COLUMN `vvId` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `src` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `previewImageVideoId` INTEGER NOT NULL,
    `fengmianVideoId` INTEGER NOT NULL,

    UNIQUE INDEX `Image_fengmianVideoId_key`(`fengmianVideoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_previewImageVideoId_fkey` FOREIGN KEY (`previewImageVideoId`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_fengmianVideoId_fkey` FOREIGN KEY (`fengmianVideoId`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
