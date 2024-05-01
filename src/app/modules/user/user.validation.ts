import { z } from "zod";

const nameValidationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

const userValidationSchema = z.object({
    body: z.object({
        name: nameValidationSchema,
        email: z.string().email(),
        password: z.string({ invalid_type_error: 'password must be string' })
        .max(20, { message: 'Password cannot be bigger than 20 characters' })
        .optional(),
    })
});

export const userValidation = {
    userValidationSchema
}