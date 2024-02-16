import "./lecturercard.css"
export default async function Page({lecturers}: {lecturers:any}) {
    return (
    <div className="lecturers-cards">
        {lecturers.map((lecturer: any, uuid: string) => (
            <div className="lecturer-card" key={uuid}>
                <img src={lecturer.picture_url}/>
                <div className="lecturer-location">
                    <span>{lecturer.location}</span>
                </div>
                <div className="lecturer-info">
                    <h3>{lecturer.title_before} {lecturer.first_name} {lecturer.middle_name} {lecturer.last_name} {lecturer.title_after}</h3>
                    <span><span className="lecturer-price-color">Kč{lecturer.price_per_hour}</span>/h</span>
                </div>
                <p dangerouslySetInnerHTML={{ __html: lecturer.bio.slice(0, 100) + (lecturer.bio.length > 100 ? '...' : '') }}></p>
                <div className="lecturer-tags">
                    <img src="/Group-22.png"/>
                    {lecturer.tags.slice(0, 3).map((tag: { name: string; uuid: string }) => tag.name).join(', ')}
                    {lecturer.tags.length > 3 && '...'}
                </div>
                <a href={`/lecturers/${lecturer.uuid}`}>
                    <div className="lecturer-btn">
                        Zobrazit lektora
                    </div>
                </a>
            </div>
        ))}
    </div>
    )
}