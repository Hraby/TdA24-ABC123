"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { LoginForm } from "@/components/login/login";
import {useFormState} from "react-dom";
import loginAction from "./formAction";


export default function Page() {
  const [error, formAction] = useFormState(loginAction, undefined);

  return(
    <>
      <div className="section">
        <Navbar />
      </div>
      <div className="section">
        <div className="login">
          <h1>Lektorská zóna </h1>
          <form className="form" action={formAction}>
            <p></p>
            <LoginForm />
            {error && <p className="text-red-600">* {error}</p>}
          </form>
        </div>
      </div>
      <div className="section">
        <Footer/>
      </div>
    </>
  )
}