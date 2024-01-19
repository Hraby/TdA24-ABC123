import './_lektor.css';

export default function Lektor() {
    return (
        <div className="lecturer">
            <a href="/#"><div className="lecturer-back"><img src="/Arrow-3.svg"/>Zpět</div></a>
            <h1>Naši lektoři</h1>
            <div className="lecturer-more">
                <div className="lecturer-img">
                    <img src="https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp" alt="Učitel obrázek"></img>
                </div>
                <div className="lecturer-info">
                    <div className="lecturer-location">
                        <span>Brno</span>
                    </div>
                    <div className="lecturer-name">
                        <h2>Mgr. Petra Swil Plachá MBA</h2>
                    </div>
                    <div className="lecturer-claim">
                        <h3>Aktivní studentka / Předsedkyně spolku / Projektová manažerka</h3>
                    </div>
                    <div className="lecturer-bio">
                        <p>Baví mě organizovat věci. Ať už to bylo vyvíjení mobilních aplikací ve Futured, pořádání konferencí, spolupráce na soutěžích Prezentiáda, pIšQworky, <b>Tour de App</b> a Středoškolák roku, nebo třeba dobrovolnictví, vždycky jsem skončila u projektového managementu, rozvíjení soft-skills a vzdělávání. U studentských projektů a akcí jsem si vyzkoušela snad všechno od marketingu po logistiku a moc ráda to předám dál. Momentálně studuji Pdf MUNI a FF MUNI v Brně</p>
                    </div>
                    <div className="lecturer-tags">
                        <div className="lecturer-tag">
                            <img src=""/>
                            <span>Kč1200/h</span>
                        </div>
                        <div className="lecturer-tag">
                            <img src=""/>
                            <span>lorem ipsum, lorem ipsum</span>
                        </div>
                        <div className="lecturer-tag">
                            <img src=""/>
                            <span>+420 323 324 432</span>
                        </div>
                        <div className="lecturer-tag">
                            <img src=""/>
                            <span>info@test.cz</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}