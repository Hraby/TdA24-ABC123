import { notFound } from "next/navigation"
import "./lecturer.css"
  
export default function Lecturer({ data }: { data: any }){
    if (!data.first_name) return notFound()

    const tags = data.tags || []
    const tagsString = data.tags.map((tag: { name: string; uuid: string }) => tag.name).join(', ');
    const phones = data.contact.telephone_numbers || []
    const phonesString = phones.join(', ')
    const emails = data.contact.emails || []
    const emailsString = emails.join(', ')

    return (
        <div className="lecturer">
            <a href="/#"><div className="lecturer-back"><img src="/Arrow-3.svg"/>Zpět</div></a>
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
                            <img src=""/>
                            <span>Kč{data.price_per_hour}/hod</span>
                        </div>
                        <div className="lecturer-tag">
                            <img src=""/>
                            {tagsString && <span>{tagsString}</span>}
                        </div>
                        <div className="lecturer-tag">
                            <img src=""/>
                            <span>{phonesString}</span>
                        </div>
                        <div className="lecturer-tag">
                            <img src=""/>
                            <span>{emailsString}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  