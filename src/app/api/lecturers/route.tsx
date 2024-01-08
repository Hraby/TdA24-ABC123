import { NextResponse } from "next/server";
import { getLecturers, addLecturer} from "@/lib/db";
import { addLecturerSchema } from "@/lib/validation";
import { validate } from "uuid";

export async function GET(request: Request) {
  const lecturers = await getLecturers();
  
  return NextResponse.json(lecturers);
}

export async function POST(request: Request) {
  const data = await request.json();
  
  const validatedData = addLecturerSchema.safeParse(data);
  if (!validatedData.success) return NextResponse.json(validatedData.error);

  const lecturer = await addLecturer(validatedData.data);

  return NextResponse.json(lecturer);
}
