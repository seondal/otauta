/*
  Warnings:

  - Made the column `artist` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Song" ALTER COLUMN "artist" SET NOT NULL;
