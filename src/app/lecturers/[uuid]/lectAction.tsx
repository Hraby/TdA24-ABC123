"use server";
import config from "@/config";
import { getUser } from "@/lib/db";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export default async function lectAction(
    formData: any,
){
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const email = formData.get("email");
    const form = formData.get("form");
    const date = formData.get("day");
    const timeSlot = formData.get("timeSlot");
    const phone_number = formData.get("phone_number");
    const message = formData.get("message");
    let formatedDate;
    if (date) {
        const parts = date.toString().split('/');
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        const parsedDate = new Date(year, month - 1, day + 1);
        parsedDate.setUTCHours(0, 0, 0, 0);
        formatedDate = parsedDate.toISOString();
    }
    const data = {first_name: first_name, last_name: last_name, email: email, form: form, date: formatedDate, timeSlot: timeSlot, phone_number: phone_number, message: message};
    
    if(first_name && last_name && email && form && date && timeSlot && phone_number && message) return true
    else return false
}