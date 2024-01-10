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
    const emailsString = data.contact.telephone_numbers.toString()
    return {
      ...data,
      "contact": {
        "telephone_numbers": telephoneNumbersString,
        "emails": emailsString,
      },
    };
  }