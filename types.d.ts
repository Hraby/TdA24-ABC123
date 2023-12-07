type Lecturers = {
    readonly uuid: string,
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
}
  
type Contact_info = {
    telephone_numbers: string[],
    emails: string[],
}
  
type Tag = {
    readonly uuid: string,
    name: string,
}

type LecturerCreateInput = {
    uuid?: string;
    title_before?: string | null;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    title_after?: string | null;
    picture_url?: string | null;
    location?: string | null;
    claim?: string | null;
    bio?: string | null;
    price_per_hour?: number | null;
    tags?: Array<{ name: string }>;
    contact?: {
      telephone_numbers?: string[] | null;
      emails?: string[] | null;
    };
  };