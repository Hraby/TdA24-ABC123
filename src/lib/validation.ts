// import { z } from "zod"

// export const addLecturerSchema = z.object({
//     uuid: z.string().optional(),
//     title_before: z.string().nullable().optional(),
//     first_name: z.string({ required_error: "First name is required!" }).min(3, "Too short").max(50, "Too long"),
//     middle_name: z.string().min(3, "Too short").max(50, "Too long").nullable().optional(),
//     last_name: z.string({ required_error: "Last name is required!" }).min(3, "Too short").max(50, "Too long"),
//     title_after: z.string().nullable().optional(),
//     picture_url: z.string().nullable().optional(),
//     location: z.string().nullable().optional(),
//     claim: z.string().nullable().optional(),
//     bio: z.string().nullable().optional(),
//     price_per_hour: z.number().nullable().optional(),
//     tags: z.array(z.object({
//         name: z.string(),
//     })).optional(),
//     contact: z.object({
//         telephone_numbers: z.string().nullable(),
//         emails: z.string().nullable(),
//     }).optional()
// })