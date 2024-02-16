import "./ourlecturers.css"
import { getLecturers } from "@/lib/db";
import LecturerCard from "../lecturercard/lecturercard"

export async function fetchLecturers() {
    const res = await getLecturers({});
    return res.slice(0, 4);
}

export default async function OurLecturers(){
    const lecturers = await fetchLecturers();
    
    return(
        <div className="ourlecturers" id="our-lecturers">
            <div className="flex items-center justify-between">
                <h2>Naši lektoři</h2>
                <a className="flex items-center gap-2" href="/lecturers">Zobrazit všechny
                    <img className="h-auto" src="/arrow-4.png"></img>
                </a>
            </div>
           <LecturerCard lecturers={lecturers} />
        </div>
    )
}