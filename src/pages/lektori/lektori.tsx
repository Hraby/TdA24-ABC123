import './_lektori.css';

export default function Lektori() {
    return (
        <div>
            <nav>
                <img src="TeacherDigitalAgency_LOGO_colour-white.png" alt="Logo TDA"></img>
                <ul>
                    <li><a href="/">DOMŮ</a></li>
                    <li><a href="#" className="active">NAŠI LEKTOŘI</a></li>
                    <li><a href="#o-nas">O NÁS</a></li>
                    <li><a href="#kontakt">KONTAKT</a></li>
                </ul>
            </nav>

            <div className="teacher-tag">
                <p>Aktivní studentka / Předsedkyně spolku / Projektová manažerka</p>
            </div>

            <div className="container">
                <div className="teacher-info">
                    <img src="https://img.freepik.com/free-photo/medium-shot-woman-teaching-lesson_23-2149272233.jpg" alt="Učitel obrázek"></img>
                        <h2>Mgr. Petra Swil Plachá MBA </h2>
                </div>

                <div className="contact-details">
                    <div className="contact-column">
                        <img className="contact-icon" src="adress-icon.png" alt="Adresa ikona"></img>
                            <p>Ulice 123, Město</p>
                    </div>

                    <div className="contact-column">
                        <img className="contact-icon" src="email-icon.png" alt="Email ikona"></img>
                            <p>ucitel@email.com</p>
                    </div>

                    <div className="contact-column">
                        <img className="contact-icon" src="phone-icon.png" alt="Telefon ikona"></img>
                            <p>+123 456 789</p>
                    </div>
                </div>
            </div>

            <div className="text-block">
                <p>Baví mě organizovat věci. Ať už to bylo vyvíjení mobilních aplikací ve Futured, pořádání konferencí, spolupráce na soutěžích Prezentiáda, pIšQworky, Tour de App a Středoškolák roku, nebo třeba dobrovolnictví, vždycky jsem skončila u projektového managementu, rozvíjení soft-skills a vzdělávání. U studentských projektů a akcí jsem si vyzkoušela snad všechno od marketingu po logistiku a moc ráda to předám dál. Momentálně studuji Pdf MUNI a FF MUNI v Brně.</p>

                <div className="columns-block">
                    <div>
                        <ul>
                            <div className="columns-text">
                                <img className="check-icon" src="check-icon.png" alt="Check ikona"></img>
                                <li>Dobrovolnictví</li>
                            </div>

                            <div className="columns-text">
                                <img className="check-icon" src="check-icon.png" alt="Check ikona"></img>
                                <li>Studentské spolky</li>
                            </div>

                            <div className="columns-text">
                                <img className="check-icon" src="check-icon.png" alt="Check ikona"></img>
                                <li>Efektivní učení</li>
                            </div>

                            <div className="columns-text">
                                <img className="check-icon" src="check-icon.png" alt="Check ikona"></img>
                                <li>Prezentační dovednosti</li>
                            </div>
                        </ul>
                    </div>

                    <div>
                        <ul>
                            <div className="columns-text">
                                <img className="check-icon" src="check-icon.png" alt="Check ikona"></img>
                                <li>Marketing pro neziskové studentské projekty</li>
                            </div>

                            <div className="columns-text">
                                <img className="check-icon" src="check-icon.png" alt="Check ikona"></img>
                                <li>Mimoškolní aktivity</li>
                            </div>

                            <div className="columns-text">
                                <img className="check-icon" src="check-icon.png" alt="Check ikona"></img>
                                <li>Projektový management, event management</li>
                            </div>

                            <div className="columns-text">
                                <img className="check-icon" src="check-icon.png" alt="Check ikona"></img>
                                <li>Fundraising pro neziskové studentské projekty</li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}