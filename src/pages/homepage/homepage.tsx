import './_homepage.css';

export default function Homepage() {
    return (
        <div>
            <nav>
                <img src="TeacherDigitalAgency_LOGO_colour-white.png" alt="Logo TDA"></img>
                <ul>
                    <li><a href="#domu" className="active">DOMŮ</a></li>
                    <li><a href="#nasi-lektori">NAŠI LEKTOŘI</a></li>
                    <li><a href="#o-nas">O NÁS</a></li>
                    <li><a href="#kontakt">KONTAKT</a></li>
                </ul>
            </nav>

            <section className="hero">

                <div id="obdelnik">
                    <div className="uvodni_text">
                        <h1>ŠPIČKOVÝ</h1>
                        <h1>UČITELÉ</h1>
                        <h1>NA DOSAH</h1>
                    </div>

                    <button id="blueButton"><h2><a href="#">NABÍDKA LEKTORŮ</a></h2></button>
                    <button id="outlinedButton"><h2><a href="#">NÁŠ PŘÍBĚH</a></h2></button>

                    <div className="lorem_text">
                        <p>Lorem ipsum dolor sit amet,
                            consectetuer adipiscing elit.
                            Aliquam erat volutpat. Aliquam
                            erat volutpat.</p>
                    </div>

                </div>

                <img id="ilustracni_img"
                     src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                     alt="Muži v zasedací místnosti"></img>

            </section>
        </div>
    )
}