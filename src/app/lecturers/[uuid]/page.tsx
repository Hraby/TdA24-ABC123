import { Navbar } from "@/components/navbar/navbar";
import Lecturer from "@/components/lecturer/lecturer";
import { Footer } from "@/components/footer/footer";

export async function generateStaticParams(){
  let url = "http://localhost:3000/api/lecturers/"
  if(process.env.NODE_ENV === "production"){
    url = "http://37922aa8e78cde16.app.tourdeapp.cz/api/lecturers/"
  }
  const res = await fetch(url)
  const lecturers = await res.json()
  return lecturers.map((lecturer: Lecturer) => ({
    uuid: lecturer.uuid
  }))
}

async function getLecturer(uuid: string){
  let url = "http://localhost:3000/api/lecturers/"
  if(process.env.NODE_ENV === "production"){
    url = "http://37922aa8e78cde16.app.tourdeapp.cz/api/lecturers/"
  }
  const res = await fetch(url+uuid)
  const data = await res.json()
  return data
}

export default async function Page({ params }: any ) {
  const lecturer: any = await getLecturer(params.uuid)

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
