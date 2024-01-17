import './_homepage.css';
import {Navbar} from "@/components/navbar/navbar"
import {Hero} from "@/components/hero/hero"
import {AboutUs} from "@/components/aboutus/aboutus"
import {OurLecturers} from "@/components/ourlecturers/ourlecturers"
import {Footer} from "@/components/footer/footer"

export default function Homepage() {
    return (
        <div>
            <section className="section">
                <Navbar/>
            </section>

            <section className="section">
                <Hero/>
            </section>

            <section className="section" id="o-nas">
                <AboutUs/>
            </section>

            <section className="section">
                <OurLecturers/>
            </section>

            <section className="section">
                <Footer/>
            </section>
        </div>
    )
}