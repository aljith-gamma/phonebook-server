/*
  Warnings:

  - You are about to drop the column `avatar_image` on the `Phonebook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Phonebook` DROP COLUMN `avatar_image`,
    ADD COLUMN `avatar_url` VARCHAR(191) NULL;
