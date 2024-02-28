import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import Dashboard from "@/components/dashboard/dashboard";
import {LoginForm} from "@/components/login/login";

export default async function Page() {
    return(
      <>
        <div className="section">
          <Navbar />
        </div>
        <div className="section">
          <Dashboard/>
        </div>
        <div className="section">
          <Footer/>
        </div>
      </>
    )
}
