type Lecturers = {
    uuid: string,
    title_before: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    title_after: string,
    picture_url: string,
    location: string,
    claim: string,
    bio: string,
    tags: Tag[],
    price_per_hour: number,
    contact: Contact_info,
    contact_infoId: number
}
  
type Contact_info = {
    telephone_numbers: string,
    emails: string
}

type Tag = {
    uuid: string,
    name: string
}

