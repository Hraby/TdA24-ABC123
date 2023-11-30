import { z } from "zod"

export const addLecturerSchema = z.object({
    uuid: z.string().uuid().optional(),
    title_before: z.string().optional(),
    first_name: z.string({ required_error: "First name is required!" }).min(3, "Too short").max(50, "Too long"),
    middle_name: z.string().min(3, "Too short").max(50, "Too long").optional(),
    last_name: z.string({ required_error: "Last name is required!" }).min(3, "Too short").max(50, "Too long"),
    title_after: z.string().optional(),
    picture_url: z.string().optional(),
    location: z.string().optional(),
    claim: z.string().optional(),
    bio: z.string().optional(),
    price_per_hour: z.number().optional(),
    tags: z.array(z.object({
        name: z.string(),
    })).optional(),
    contact: z.object({
        telephone_numbers: z.array(z.string()).optional(),
        emails: z.array(z.string()).optional(),
    }).optional()
})