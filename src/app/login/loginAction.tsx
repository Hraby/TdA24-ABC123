"use server";
import config from "@/config";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export default async function loginAction(
    currentState: any,
    formData: FormData,
): Promise<string>{
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch(config.apiUrl + "/auth/login", {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa("TdA"+":"+"d8Ef6!dGG_pv"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    
    const json = await res.json();

    cookies().set("Authorization", json.token, {
        secure: true,
        httpOnly: true,
        expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
        path: "/",
        sameSite: "strict",
      });

    if (res.ok) {
        redirect("/dashboard");
      } else {
        return json.error;
      }

}