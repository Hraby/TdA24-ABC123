import Lektor from "@/components/lektor/lektor";
import {Navbar} from "@/components/navbar/navbar";
import {Footer} from "@/components/footer/footer"

export default function Lecturer() {
    return (
        <div>
            <div className="section">
                <Navbar/>
            </div>
            <div className="section">
                <Lektor/>
            </div>
            <div className="section">
                <Footer/>
            </div>
        </div>
    )
}
