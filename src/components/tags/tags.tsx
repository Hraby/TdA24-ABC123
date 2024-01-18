import "./tags.css"

async function getLecturers(){
    let url = "http://localhost:3000/api/lecturers/?limit=4"
    if(process.env.NODE_ENV === "production"){
        url = "http://37922aa8e78cde16.app.tourdeapp.cz/api/lecturers/?limit=4"
    }
    const res = await fetch(url)
    const lecturers = res.json()
    return lecturers
}


export async function Tags(){
    const lecturers = await getLecturers()
    return(
        <>
            <div className="ourlecturers-filters">
                <div className="ourlecturers-filter">
                    <span>Tagy</span>
                    <img src="/Arrow-1.svg"></img>
                </div>
                <div className="ourlecturers-filter">
                    <span>Lokace</span>
                    <img src="/Arrow-1.svg"></img>
                </div>
                <div className="ourlecturers-filter">
                    <span>Cena</span>
                    <img src="/Arrow-1.svg"></img>
                </div>
            </div>
            <div className="lecturers-cards">
            {lecturers.map((lecturer: any, uuid: string) => (
                <div className="lecturer-card" key={uuid}>
                    <img src={lecturer.picture_url}/>
                    <div className="lecturer-location">
                        <span>{lecturer.location}</span>
                    </div>
                    <div className="lecturer-info">
                        <h3>{lecturer.title_before} {lecturer.first_name} {lecturer.middle_name} {lecturer.last_name} {lecturer.title_after}</h3>
                        <span>Kč{lecturer.price_per_hour}/h</span>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: lecturer.bio }}></p>
                    <div className="lecturer-tags">
                        <img src="/Group-22.png"/>
                        {lecturer.tags.map((tag: { name: string; uuid: string }) => tag.name).join(', ')}
                    </div>
                    <a href={`/lecturers/${lecturer.uuid}`}>
                        <div className="lecturer-btn">
                            Zobrazit lektora
                        </div>
                    </a>
                </div>
                ))}
            </div>
        </>
    )
}