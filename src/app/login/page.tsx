import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { LoginForm } from "@/components/login/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Page({ params }: any ) {
  // const submit = async (formData: FormData) =>{
  //   "use server";

  //   const callbackUrl = params.get("callbackUrl") || "/profile";
  //   const res = await fetch("/api/auth/login", {
  //     method: "POST",
  //     body: {
  //       username: formData.get("username"),
  //       password: formData.get("password"),
  //     },
  //     headers: {
  //       'Authorization': "Basic " + btoa("TdA"+":"+"d8Ef6!dGG_pv"),
  //       'Content-Type': 'application/json',
  //     },
  //     callbackUrl,
  //   });
  //   await res;
  //   console.log({res})
  //   redirect("/dashboard");
  // }

  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return(
    <>
      <div className="section">
        <Navbar />
      </div>
      <div className="section">
        <div className="login">
          <h1>Lektorská zóna </h1>
            <LoginForm />
        </div>
      </div>
      <div className="section">
        <Footer/>
      </div>
    </>
  )
}