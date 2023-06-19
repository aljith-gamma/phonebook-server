/*
  Warnings:

  - Added the required column `address` to the `Phonebook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Phonebook` ADD COLUMN `address` VARCHAR(191) NOT NULL;
