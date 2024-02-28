import { NextResponse } from "next/server";
import { getReservations, addReservation } from "@/lib/db";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const uuid = searchParams.has("uuid") ? searchParams.get("uuid")! : undefined;
    const date = searchParams.has("date") ? searchParams.get("date")! : undefined;
    const reservations = await getReservations({date, uuid});
    return NextResponse.json(reservations);
}

export async function POST(request: Request){
    const data = await request.json();
    const reservation = await addReservation(data);
    return NextResponse.json(reservation);
}