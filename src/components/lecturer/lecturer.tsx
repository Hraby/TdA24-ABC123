import { notFound } from "next/navigation"
import "./lecturer.css"
  
export default function Lecturer({ data }: { data: any }){
    if (!data.first_name) return notFound()

    const tags = data.tags || []
    const tagsString = tags.map((tag: { name: string; uuid: string }) => tag.name).join(', ');

    const contact = data.contact || {};
    const phones = contact.telephone_numbers || [];

    const emails = contact.emails || [];

    return (
        <div className="lecturer">
            <a href="/lecturers"><div className="lecturer-back"><img src="/Arrow-3.svg"/>Zpět</div></a>
            <h1>Naši lektoři</h1>
            <div className="lecturer-more">
                <div className="lecturer-img">
                    <img src={data.picture_url} alt="Učitel obrázek"></img>
                </div>
                <div className="lecturer-info">
                    <div className="lecturer-location">
                        <span>{data.location}</span>
                    </div>
                    <div className="lecturer-name">
                        <h2>{data.title_before} {data.first_name} {data.middle_name} {data.last_name} {data.title_after}</h2>
                    </div>
                    <div className="lecturer-claim">
                        <h3 dangerouslySetInnerHTML={{ __html: data.claim }}></h3>
                    </div>
                    <div className="lecturer-bio">
                        <p dangerouslySetInnerHTML={{ __html: data.bio }}></p>
                    </div>
                    <div className="lecturer-tags">
                        <div className="lecturer-tag">
                            <img src="/cash.png"/>
                            <span>Kč{data.price_per_hour}/hod</span>
                        </div>
                        <div className="lecturer-tag">
                            <img src="/tags.png"/>
                            {tagsString && <span>{tagsString}</span>}
                        </div>
                        <div className="lecturer-tag">
                            <img src="/call.png"/>
                            <span>{phones}</span>
                        </div>
                        <div className="lecturer-tag">
                            <img src="/email.png"/>
                            <span>{emails}</span>
                        </div>
                    </div>
                    <a href="">Domluvit si schůzku</a>
                </div>
            </div>
        </div>
    )
  }
  