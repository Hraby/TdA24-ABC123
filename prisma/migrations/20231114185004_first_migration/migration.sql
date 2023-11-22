-- CreateTable
CREATE TABLE "Lecturer" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "title_before" TEXT,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "title_after" TEXT,
    "picture_url" TEXT,
    "location" TEXT NOT NULL,
    "claim" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "price_per_hour" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "LecturerTag" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "lecturerUUID" TEXT,
    "tagUUID" TEXT,
    CONSTRAINT "LecturerTag_lecturerUUID_fkey" FOREIGN KEY ("lecturerUUID") REFERENCES "Lecturer" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "LecturerTag_tagUUID_fkey" FOREIGN KEY ("tagUUID") REFERENCES "Tag" ("UUID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "UUID" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
