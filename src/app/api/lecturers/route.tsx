import { NextResponse } from "next/server";
import { getLecturers, addLecturer} from "@/lib/db";
import { addLecturerSchema } from "@/lib/validation";
import { contactTransform } from "@/utils/db";

export async function GET(request: Request) {
  const lecturers = await getLecturers();
  
  return NextResponse.json(lecturers);
}

export async function POST(request: Request) {
  const data = await request.json();
  const transformedData = await contactTransform(data);
  const validatedData = addLecturerSchema.safeParse(transformedData);
  
  if (!validatedData.success) return NextResponse.json({message: validatedData.error}, {status: 400});

  const lecturer = await addLecturer(validatedData.data);

  return NextResponse.json(lecturer);
}
