import "./footer.css"

export function Footer(){
    return(
        <div className="footer">
            <div className="footer-up">
                <div className="footer-left">
                    <img src="/TeacherDigitalAgency_LOGO_colour-white.png"/>
                </div>
                <div className="footer-right">
                    <h3>Menu</h3>
                    <div className="footer-menu">
                        <a href="/#our-lecturers">Naši lektoři</a>
                        <a href="/#o-nas">O nás</a>
                        <a href="/#contact">Kontakt</a>
                    </div>
                </div>
            </div>
            <span>© 2024 TdA | Vytvořilo <a href="https://github.com/Hraby/TdA24-ABC123" target="_blank">ABC123</a></span>
        </div>
    )
}