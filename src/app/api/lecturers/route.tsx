import { NextResponse } from "next/server";
import { getLecturers, addLecturer } from "@/lib/db";
import { addLecturerSchema } from "@/lib/validation";

export async function GET(response: Response) {
  const lecturers = await getLecturers();
  
  return NextResponse.json(lecturers);
}

export async function POST(request: Request) {
  const data = await request.json();
  
  const validatedData = addLecturerSchema.safeParse(data);
  if (!validatedData.success) return NextResponse.json(validatedData.error);

  const lecturer = addLecturer(validatedData.data);

  return NextResponse.json(lecturer);
}
