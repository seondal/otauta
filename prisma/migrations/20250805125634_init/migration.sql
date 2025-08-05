/*
  Warnings:

  - Made the column `songNumber` on table `KaraokeInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."KaraokeInfo" ALTER COLUMN "songNumber" SET NOT NULL;
