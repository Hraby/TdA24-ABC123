import "./lecturers.css"
import { getLecturers } from "@/lib/db";
import {LecturerCard} from "@/components/lecturerCard/lecturerCard"
import SelectFilter from "@/components/filters/_select"
import SliderFilter from "@/components/filters/_slider"
import { redirect } from "next/navigation"


async function fetchFilters(){
    const lecturers = await getLecturers({});
    const uniquePrices = [...new Set(lecturers.map((lecturer: any) => lecturer.price_per_hour))];
    const uniqueLocations = [...new Set(lecturers.map((lecturer: any) => lecturer.location))];
    const uniqueTags = [...new Set(lecturers.flatMap((lecturer: any) => lecturer.tags.map((tag: Tag) => tag.name)))];
  
    return {
      uniquePrices,
      uniqueLocations,
      uniqueTags,
    }
}

async function fetchLecturers({params}: {params:any}) {
    return await getLecturers(params);
}

export default async function Page({params}: {params:any}){
    const lecturers = await fetchLecturers({params})
    const filters = await fetchFilters()

    const filterLecturers = async (formData: FormData) =>{
        "use server"
        const tags = formData.getAll("Tagy")
        const price = formData.get("Cena")
        const location = formData.get("Lokace")

        const params = new URLSearchParams();

        if (tags.some(tag => tag !== "all")) {
            params.append("tags", tags.toString());
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
        <div className="lecturers min-h-screen">
            <h1>Naši lektoři</h1>
            <form action={filterLecturers}>
                <div className="ourlecturers-filters">
                    <SelectFilter name={"Tagy"} data={filters.uniqueTags} />
                    <SliderFilter name={"Cena"} data={filters.uniquePrices}/>
                    <SelectFilter name={"Lokace"} data={filters.uniqueLocations}/>
                    <button className="filter-btn" type="submit">Filtrovat</button>
                </div>
            </form>
            {lecturers != null && lecturers.length > 0 ?(
                <LecturerCard lecturers={lecturers}/>
            ) : (
                <div className="flex items-center justify-center flex-col">
                    <span className="cancel-text">Nebyli nalezeni žádní lektoři :(</span>
                    <span className="cancel-action">Můžete zrušit filtry kliknutím <a className="cancel-action" href="/lecturers">ZDE</a></span>
                </div>
            )}
            
        </div>
    )
}