"use client";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { LoginForm } from "@/components/login/login";
import {useFormState} from "react-dom";
import loginAction from "./loginAction";


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
            <LoginForm />
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
      <div className="section">
        <Footer/>
      </div>
    </>
  )
}