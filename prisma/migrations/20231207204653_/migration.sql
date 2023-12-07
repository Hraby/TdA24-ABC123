-- CreateTable
CREATE TABLE "Lecturer" (
    "uuid" TEXT NOT NULL,
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

    CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Tag" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Contact_info" (
    "id" SERIAL NOT NULL,
    "telephone_numbers" TEXT[],
    "emails" TEXT[],
    "lecturerUuid" TEXT NOT NULL,

    CONSTRAINT "Contact_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_tag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Lecturer_uuid_key" ON "Lecturer"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_uuid_key" ON "Tag"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_info_id_key" ON "Contact_info"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_tag_AB_unique" ON "_tag"("A", "B");

-- CreateIndex
CREATE INDEX "_tag_B_index" ON "_tag"("B");

-- AddForeignKey
ALTER TABLE "Contact_info" ADD CONSTRAINT "Contact_info_lecturerUuid_fkey" FOREIGN KEY ("lecturerUuid") REFERENCES "Lecturer"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tag" ADD CONSTRAINT "_tag_A_fkey" FOREIGN KEY ("A") REFERENCES "Lecturer"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_tag" ADD CONSTRAINT "_tag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
