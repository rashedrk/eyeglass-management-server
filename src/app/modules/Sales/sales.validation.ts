import { z } from "zod";

const salesValidationSchema = z.object({
    body: z.object({
        productId: z.string(),
        quantity: z.number().positive(),
        buyer: z.string(),
        dateOfSale: z.string().datetime(),
    })
});

export const SalesValidation = {
    salesValidationSchema,
}