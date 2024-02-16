import { NextResponse } from "next/server";
import { getLecturers, addLecturer} from "@/lib/db";
import { contactTransform, dataTransform } from "@/utils/db";


export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const tags = searchParams.has("tags") ? searchParams.get("tags")! : undefined;
  const location = searchParams.has("location") ? searchParams.get("location")! : undefined;
  const price = searchParams.has("price_per_hour") ? parseInt(searchParams.get("price_per_hour")!) : undefined;
  const lecturers = await getLecturers({ tags, location, price });
  return NextResponse.json(lecturers);
}

export async function POST(request: Request) {
  const data = await request.json();
  if (!data.first_name || !data.last_name || data.first_name == null || data.last_name == null) return NextResponse.json({message: "First name and last name are required"}, {status: 400});
  const transformedData = await contactTransform(data);

  const lecturer = await addLecturer(transformedData);
  const transformedLecturer = await dataTransform(lecturer);

  return NextResponse.json(transformedLecturer, {status: 200});
}
