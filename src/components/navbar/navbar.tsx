import "./navbar.css"

export function Navbar(){
    return(
        <nav>
            <a href="/"><img src="/TeacherDigitalAgency_LOGO_colour-white.png" alt="Logo TDA"></img></a>
            <ul>
                <li><a href="/">DOMŮ</a></li>
                <li><a href="/lecturer" className="active">NAŠI LEKTOŘI</a></li>
                <li><a href="#o-nas">O NÁS</a></li>
                <li><a href="#kontakt">KONTAKT</a></li>
            </ul>
        </nav>
    )
}