/*
  Warnings:

  - You are about to drop the column `description` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `SeriesSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `SongSubmission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Series" DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "titleEn";

-- AlterTable
ALTER TABLE "public"."SeriesSubmission" DROP COLUMN "titleEn";

-- AlterTable
ALTER TABLE "public"."Song" DROP COLUMN "titleEn";

-- AlterTable
ALTER TABLE "public"."SongSubmission" DROP COLUMN "titleEn";
