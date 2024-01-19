import "./hero.css"
import Image from "next/image"

export function Hero(){
    return(
        <div className="hero">
            <h1 className="hero-main-text">Mladá společnost zaměřená na vyhledávání špičkových odborníků z řad učitelů, lektorů a tutorů.</h1>
            <div className="hero-image">
                <div className="hero-btns">
                    <a href="/#our-lecturers"><div className="hero-btn-main">Naši lektoři</div></a>
                    <a href="/#o-nas"><div className="hero-btn-scnd">Náš příběh</div></a>
                </div>
                <img src="/ilustracni_obrazek.jpeg" alt="TdA ilustrační obrázek kanceláře"/>
            </div>
        </div>
    )
}