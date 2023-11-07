/*
  Warnings:

  - Added the required column `date` to the `leads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
