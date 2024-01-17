import './lecturer.css';

export async function Lecturer({data}: {data: Lecturer}) {

    return (
        <>
            <div className="teacher-tag">
                <p>{data.claim}</p>
            </div>

            <div className="container">
                <div className="teacher-info">
                    <img src={data.picture_url} alt="Učitel obrázek"/>
                    <h2>{data.title_before} {data.first_name} {data.middle_name} {data.last_name} {data.title_after}</h2>
                </div>

                <div className="contact-details">
                    <div className="contact-column">
                        <img className="contact-icon" src="/adress-icon.png" alt="Adresa ikona"></img>
                            <p>{data.location}</p>
                    </div>

                    <div className="contact-column">
                        <img className="contact-icon" src="/email-icon.png" alt="Email ikona"></img>
                            <p>{data?.contact?.emails}</p>
                    </div>

                    <div className="contact-column">
                        <img className="contact-icon" src="/phone-icon.png" alt="Telefon ikona"></img>
                            <p>{data?.contact?.telephone_numbers}</p>
                    </div>
                </div>
            </div>

            <div className="text-block">
                <p>{data.bio}</p>

                <div className="columns-block">
                    <div>
                        <ul>
                            {data.tags &&
                                data.tags.map((tag) => (
                                    <div key={tag.uuid} className="columns-text">
                                        <img className="check-icon" src="/check-icon.png" alt="Check ikona"></img>
                                        <li>{tag.name}</li>
                                    </div>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}