import { Navbar } from "@/components/navbar/navbar";
import Lecturer from "@/components/lecturer/lecturer";
import { Footer } from "@/components/footer/footer";
import { getLecturer } from "@/lib/db";

async function fetchLecturer(uuid: string){
  return await getLecturer(uuid)
}

export default async function Page({ params }: any ) {
  const lecturer: any = await fetchLecturer(params.uuid)

    return (
      <>
        <div className="section">
          <Navbar />
        </div>
        <div className="section">
          <Lecturer data={lecturer}/>
        </div>
        <div className="section">
          <Footer/>
        </div>
      </>
    )
}
