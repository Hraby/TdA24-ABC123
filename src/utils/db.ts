export async function contactTransform(data: any) {
    if(!data.contact) return data
  
    if (data.contact && data.contact.telephone_numbers && !data.contact.emails) {
      const telephoneNumbersString = data.contact.telephone_numbers.toString()
      return {
        ...data,
        "contact": {
          "telephone_numbers": telephoneNumbersString,
        },
      }
    }

    if (data.contact && data.contact.emails && !data.contact.telephone_numbers) {
      const emailsString = data.contact.emails.toString()
      return {
        ...data,
        "contact": {
          "emails": emailsString,
        },
      }
    }
  
    const telephoneNumbersString = data.contact.telephone_numbers.toString()
    const emailsString = data.contact.emails.toString()
    return {
      ...data,
      "contact": {
        "emails": emailsString,
        "telephone_numbers": telephoneNumbersString,
      },
    };
  }

export async function dataTransform(data: any){
  return {
    "uuid": data.uuid,
    "title_before": data.title_before,
    "first_name": data.first_name,
    "middle_name": data.middle_name,
    "last_name": data.last_name,
    "title_after": data.title_after,
    "picture_url": data.picture_url,
    "location": data.location,
    "claim": data.claim,
    "bio": data.bio,
    "tags": data.tags?.map((tag: Tag) => ({
      "uuid": tag.uuid,
      "name": tag.name 
    })),
    "price_per_hour": data.price_per_hour,
    "contact": {
      ...data.contact,
      "emails": data?.contact?.emails
        ? data.contact.emails.split(',').map((email: string) => email.trim())
        : [],
      "telephone_numbers": data?.contact?.telephone_numbers
        ? data.contact.telephone_numbers.split(',').map((phone: string) => phone.trim())
        : []
    }
  }
}