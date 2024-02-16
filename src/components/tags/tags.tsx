import { redirect } from 'next/navigation'
import "./tags.css"
import {LecturerCard} from "@/components/lecturerCard/lecturerCard"
import DropdownFilter from "@/components/filters/_dropdown-menu"
import SelectFilter from "@/components/filters/_select"
import SliderFilter from "@/components/filters/_slider"

async function fetchFilters(){
    let url = "http://localhost:3000/api/lecturers/"
    if(process.env.NODE_ENV === "production"){
        url = "http://37922aa8e78cde16.app.tourdeapp.cz/api/lecturers/"
    }
    const res = await fetch(url)
    const lecturers = await res.json()
    const uniquePrices = [...new Set(lecturers.map((lecturer: any) => lecturer.price_per_hour))];
    const uniqueLocations = [...new Set(lecturers.map((lecturer: any) => lecturer.location))];
    const uniqueTags = [...new Set(lecturers.flatMap((lecturer: any) => lecturer.tags.map((tag: Tag) => tag.name)))];
  
    return {
      uniquePrices,
      uniqueLocations,
      uniqueTags,
    }
}

async function getLecturers(){
    let url = "http://localhost:3000/api/lecturers/?limit=4"
    if(process.env.NODE_ENV === "production"){
        url = "http://37922aa8e78cde16.app.tourdeapp.cz/api/lecturers/?limit=4"
    }
    const res = await fetch(url)
    const lecturers = await res.json()
    const selectedLecturers = lecturers.slice(0, 4)
    return selectedLecturers
}

export default async function Tags() {
    const filters = await fetchFilters()
    const lecturers = await getLecturers()

    const filterLecturers = async (formData: FormData) =>{
        "use server"
        const tags = formData.getAll("Tagy")
        const price = formData.get("Cena")
        const location = formData.get("Lokace")

        const params = new URLSearchParams();
        if (tags.some(tag => tag !== "")) {
            params.append("tags", tags.join(","));
        }

        if (price !== null && price !== "max") {
            params.append("price_per_hour", price.toString());
        }

        if (location !== null && location !== "all") {
            params.append("location", location.toString());
        }

        if (params.toString() !== ""){
            redirect("/lecturers?" + params.toString());
        }
        
        redirect("/lecturers");
        
    }

    return(
        <>
            <form action={filterLecturers}>
                <div className="ourlecturers-up">
                    <div className="ourlecturers-filters">
                        <DropdownFilter name={"Tagy"} data={filters.uniqueTags} />
                        <SliderFilter name={"Cena"} data={filters.uniquePrices}/>
                        <SelectFilter name={"Lokace"} data={filters.uniqueLocations}/>
                        <button className="filter-btn" type="submit">Filtrovat</button>
                    </div>
                    <div className="ourlecturers-more">
                        <a className="flex items-center" href="/lecturers">Zobrazit všechny
                            <img className="h-full" src="/arrow-4.png"></img>
                        </a>
                    </div>
                </div>
            </form>
            <LecturerCard lecturers={lecturers} />
        </>
    )
}
