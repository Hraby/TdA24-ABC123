import {Navbar} from "@/components/navbar/navbar"
import {Footer} from "@/components/footer/footer"
import Head from "next/head"

export default function NotFound(){
    return(
        <>
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
                <div className="not-found">
                    <h1>Stránka nebyla nalezena.</h1>
                    <p>Nemohli jsme najít stránku po které tak toužíte.<br/>Prosím vraťte se zpátky na <a href="/">Domovskou</a> stránku</p>
                </div>
            </section>

            <section className="section">
                <Footer/>
            </section>
        </div>
        </>
    )
}