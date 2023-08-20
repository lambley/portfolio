/*
  Warnings:

  - You are about to alter the column `title` on the `Portfolio` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `description` on the `Portfolio` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[url]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[repoUrl]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Portfolio" ALTER COLUMN "title" SET DEFAULT '',
ALTER COLUMN "title" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "description" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "categories" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "date" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_url_key" ON "Portfolio"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_repoUrl_key" ON "Portfolio"("repoUrl");
