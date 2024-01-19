import "./lecturers.css"
import LecturerCard from "@/components/lecturercard/lecturercard"
import { redirect } from 'next/navigation'

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

export async function fetchLecturers({params}: {params:any}) {
    let url = "http://localhost:3000/api/lecturers?"
    if(process.env.NODE_ENV === "production"){
        url = "http://37922aa8e78cde16.app.tourdeapp.cz/api/lecturers?"
    }
    if(params.tags) url += "&tags="+params.tags
    if(params.price_per_hour) url += "&price_per_hour="+params.price_per_hour
    if(params.location) url += "&location="+params.location
    const res = await fetch(url)
    const lecturers = await res.json()
    return lecturers
}

export default async function Page({params}: {params: any}){
    const lecturers = await fetchLecturers({params})
    const filters = await fetchFilters()
    const filterLecturers = async (formData: FormData) =>{
        "use server"
        const tags = formData.get("tags")
        const price = formData.get("price")
        const location = formData.get("location")

        let url = "http://localhost:3000/lecturers?"
        if(process.env.NODE_ENV === "production"){
            url = "http://37922aa8e78cde16.app.tourdeapp.cz/lecturers?"
        }
        if(tags) url += "&tags="+tags
        if(price) url += "&price_per_hour="+price
        if(location) url += "&location="+location
        return redirect(url)
        
    }
    return(
        <div className="lecturers">
            <h1>Naši lektoři</h1>
            <form action={filterLecturers}>
                <div className="ourlecturers-filters">
                    <select className="ourlecturers-filter" name="tags">
                        <option value="">Tagy</option>
                        {filters.uniqueTags.map((tag:any, index:any) => (
                        <option key={index} value={tag}>
                        {tag}
                        </option>
                        ))}
                    </select>
                    <select className="ourlecturers-filter" name="price">
                        <option value="">Cena</option>
                        <option value="500">≤ 500</option>
                        <option value="1000">≤ 1000</option>
                        <option value="1500">≤ 1500</option>
                        <option value="1501">&gt; 1500</option>
                    </select>
                    <select className="ourlecturers-filter" name="location">
                        <option value="">Lokace</option>
                        {filters.uniqueLocations.map((location: any, index: any) => (
                        <option key={index} value={location}>
                        {location}
                        </option>
                        ))}
                    </select>
                    <button type="submit">Filtrovat</button>
                </div>
            </form>
            <LecturerCard lecturers={lecturers}/>
        </div>
    )
}