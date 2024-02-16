import {Navbar} from "@/components/navbar/navbar"
import {Hero} from "@/components/hero/hero"
import AboutUs from "@/components/aboutus/aboutus"
import OurLecturers from "@/components/ourlecturers/ourlecturers"
import {Footer} from "@/components/footer/footer"
import Contact from "@/components/contact/contact"
import Head from "next/head"

export default function Home() {
    return (
        <div>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
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

            <section className="section" id="kontakt">
                <Contact/>
            </section>

            <section className="section">
                <Footer/>
            </section>
        </div>
    )
}
