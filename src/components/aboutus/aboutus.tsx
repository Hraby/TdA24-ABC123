import "./aboutUs.css"

export default function AboutUs(){
    return(
        <div className="aboutus">
            <div className="aboutus-main">
                <h2>O nás</h2>
                <p>Teacher digital Agency je mladá společnost zaměřená na vyhledávání špičkových odborníků z řad učitelů, lektorů a tutorů. Sestavujeme exkluzivní databázi těchto specialistů, abychom mohli efektivně propojovat klienty s ideálními odborníky
                    dle jejich přání a specifických potřeb. 
                    Vaše vzdělávání je u nás v dobrých rukou.
                </p>
            </div>
            <div className="aboutus-second">
                <img className="aboutus-img" src="/student-example-1.png"/>
                <img className="aboutus-img2" src="/student-example-2.png"/>
            </div>
            <div className="aboutus-third">
                <a href="/#our-lecturers">Zobrazit lektory <img src="/arrow-2.svg"/></a>
            </div>
        </div>
    )
}