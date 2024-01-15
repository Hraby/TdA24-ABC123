import { NextResponse } from "next/server";
import { getLecturers, addLecturer} from "@/lib/db";
// import { addLecturerSchema } from "@/lib/validation";
import { contactTransform, dataTransform } from "@/utils/db";

export async function GET(request: Request) {
  const lecturers = await getLecturers();
  
  return NextResponse.json(lecturers);
}

export async function POST(request: Request) {
  const data = await request.json();
  if (!data.first_name || !data.last_name || data.first_name == null || data.last_name == null) return NextResponse.json({message: "First name and last name are required"}, {status: 400});
  const transformedData = await contactTransform(data);
  // const validatedData = addLecturerSchema.safeParse(transformedData);

  const lecturer = await addLecturer(transformedData)
  const transformedLecturer = await dataTransform(lecturer)

  return NextResponse.json(transformedLecturer, {status: 200})
}
