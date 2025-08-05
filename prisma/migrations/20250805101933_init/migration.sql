/*
  Warnings:

  - You are about to drop the column `description` on the `SeriesSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `SeriesSubmission` table. All the data in the column will be lost.
  - Made the column `titleKr` on table `SeriesSubmission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."SeriesSubmission" DROP COLUMN "description",
DROP COLUMN "updatedAt",
ALTER COLUMN "titleKr" SET NOT NULL;
