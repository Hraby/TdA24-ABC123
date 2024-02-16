import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import Lecturers from "@/components/lecturers/lecturers"

export default function Page({searchParams}: {searchParams: any}) {
    return (
        <div>
            <div className="section">
                <Navbar/>
            </div>
            <div className="section">
                <Lecturers params={searchParams}/>
            </div>
            <div className="section">
                <Footer/>
            </div>
        </div>
    )
}