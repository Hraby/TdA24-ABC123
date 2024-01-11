-- CreateTable
CREATE TABLE "Lecturer" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "title_before" TEXT,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "title_after" TEXT,
    "picture_url" TEXT,
    "location" TEXT,
    "claim" TEXT,
    "bio" TEXT,
    "price_per_hour" INTEGER,
    "contact_infoId" INTEGER,
    CONSTRAINT "Lecturer_contact_infoId_fkey" FOREIGN KEY ("contact_infoId") REFERENCES "Contact_info" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Contact_info" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telephone_numbers" TEXT NOT NULL,
    "emails" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LecturerTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_LecturerTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Lecturer" ("uuid") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LecturerTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("uuid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Lecturer_uuid_key" ON "Lecturer"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_uuid_key" ON "Tag"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_LecturerTag_AB_unique" ON "_LecturerTag"("A", "B");

-- CreateIndex
CREATE INDEX "_LecturerTag_B_index" ON "_LecturerTag"("B");
