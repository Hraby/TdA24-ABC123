import { Lecturer } from "@/pages/lecturer/lecturer";
import { Navbar } from "@/components/navbar/navbar";
import { notFound } from 'next/navigation'

async function getData(uuid: string) {
  let url = "http://localhost:3000/api/lecturers/"
  if(process.env.NODE_ENV === "production"){
    url = "http://37922aa8e78cde16.app.tourdeapp.cz/api/lecturers/"
  }
  const res = await fetch(url + uuid);

  if (!res.ok) {
    return null
  }

  const data = await res.json();
  return data;
}

export default async function Page({ params }: { params: { uuid: string } }) {
    const uuid = params.uuid;
    const data: Lecturer = await getData(uuid);

    if(data == null) return notFound()
    
    return (
      <>
        <Navbar />
        <Lecturer data={data}></Lecturer>
      </>
    )
}