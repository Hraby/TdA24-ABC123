import { NextResponse } from "next/server";
import { getLecturers, addLecturer} from "@/lib/db";
import { contactTransform, dataTransform } from "@/utils/db";
import { revalidatePath } from "next/cache";


export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const tag = searchParams.has('tags') ? searchParams.get('tag')! : undefined;
  const location = searchParams.has('location') ? searchParams.get('location')! : undefined;
  const price_per_hourParam = searchParams.get('price_per_hour');
  const price_per_hour = price_per_hourParam && price_per_hourParam != "1501" ? parseFloat(price_per_hourParam) : undefined;
  const lecturers = await getLecturers({ tag, location, price_per_hour });
  revalidatePath("/")
  return NextResponse.json(lecturers);
}

export async function POST(request: Request) {
  const data = await request.json();
  if (!data.first_name || !data.last_name || data.first_name == null || data.last_name == null) return NextResponse.json({message: "First name and last name are required"}, {status: 400});
  const transformedData = await contactTransform(data);

  const lecturer = await addLecturer(transformedData)
  const transformedLecturer = await dataTransform(lecturer)

  return NextResponse.json(transformedLecturer, {status: 200})
}
