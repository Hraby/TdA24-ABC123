import "./navbar.css"

export function Navbar(){
    return(
        <nav>
            <a href="/"><img src="/TeacherDigitalAgency_LOGO_colour-white.png" alt="Logo TDA"></img></a>
            <ul>
                <li><a href="/">Domů</a></li>
                <li><a href="/lecturer">Naši lektoři</a></li>
                <li><a href="/#o-nas">O nás</a></li>
                <li><a href="/#">Kontakt</a></li>
            </ul>
        </nav>
    )
}