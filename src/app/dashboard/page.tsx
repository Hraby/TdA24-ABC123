import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import Dashboard from "@/components/dashboard/dashboard";
import { getLecturer, getReservations } from "@/lib/db";
import { cookies } from "next/headers";
import * as jose from "jose";
import config from "@/config";


export default async function Page() {
  const data = await getReservations()
  const cookie = cookies().get("Authorization");
  const secret = new TextEncoder().encode(config.JWT_SECRET);
  const jwt = cookie!.value;
  const { payload } = await jose.jwtVerify(jwt, secret, {});
  const lecturer = await getLecturer(payload.sub!)

    return(
      <>
        <div className="section">
          <Navbar />
        </div>
        <div className="section">
          <Dashboard data={data} lecturer={lecturer}/>
        </div>
        <div className="section">
          <Footer/>
        </div>
      </>
    )
}
