import "./navbar.css"

export function Navbar(){
    return(
        <nav>
            <a href="/"><img src="/TeacherDigitalAgency_LOGO_colour-white.png" alt="Logo TDA"></img></a>
            <ul>
                <li><a className="item" href="/lecturers">Naši lektoři</a></li>
                <li><a className="item" href="/#o-nas">O nás</a></li>
                <li><a className="item" href="/#kontakt">Kontakt</a></li>
                <li><a className="lecturer-zone-btn" href="/dashboard">Lektorská zóna</a></li>
            </ul>
        </nav>
    )
}