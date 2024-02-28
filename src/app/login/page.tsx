import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import {LoginForm} from "@/components/login/login";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import config from '@/config.js';

export default async function Page() {
  // const session = await getSession();
  const submit = async (formData: FormData) =>{
    "use server";
    const res = await fetch(config.apiUrl+"/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password")
      }),
    });
    await res;
    console.log({res})
    redirect("/dashboard");
  }

  return(
    <>
      <div className="section">
        <Navbar />
      </div>
      <div className="section">
        <div className="login">
          <h1>Lektorská zóna </h1>
          <form action={submit}>
            <LoginForm />
            <Button type="submit">
              Přihlásit se
            </Button>
          </form>
        </div>
      </div>
      <div className="section">
        <Footer/>
      </div>
    </>
  )
}
