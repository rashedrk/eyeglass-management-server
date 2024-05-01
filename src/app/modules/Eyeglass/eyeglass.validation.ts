import { z } from "zod";

const eyeglassValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        quantity: z.number(),
        price: z.number(),
        frameMaterial: z.enum(['metal', 'acetate', 'plastic', 'stainless-steel', 'polycarbonate']),
        frameShapes: z.enum(['rectangular', 'round', 'cat-eye', 'square', 'wayfarer', 'sports']),
        color: z.enum(['black', 'blue', 'green', 'white', 'gold', 'gray', 'silver']),
        frameType: z.enum(['full-rim', 'half-rim', 'rimless']),
        frameSize: z.enum(['narrow', 'medium', 'wide', 'large']),
        lensType: z.enum(['single-vision', 'progressive', 'bifocal']),
        brand: z.enum(['lenskart', 'john-jacobs', 'fossil', 'ojos']),
        gender: z.enum(['men', 'women', 'unisex']),
        img: z.string(),
    })
});

const updateEyeglassValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        quantity: z.number().optional(),
        price: z.number().optional(),
        frameMaterial: z.enum(['metal', 'acetate', 'plastic', 'stainless-steel', 'polycarbonate']).optional(),
        frameShapes: z.enum(['rectangular', 'round', 'cat-eye', 'square', 'wayfarer', 'sports']).optional(),
        color: z.enum(['black', 'blue', 'green', 'white', 'gold', 'gray', 'silver']).optional(),
        frameType: z.enum(['full-rim', 'half-rim', 'rimless']).optional(),
        frameSize: z.enum(['narrow', 'medium', 'wide', 'large']).optional(),
        lensType: z.enum(['single-vision', 'progressive', 'bifocal']).optional(),
        brand: z.enum(['lenskart', 'john-jacobs', 'fossil', 'ojos']).optional(),
        gender: z.enum(['men', 'women', 'unisex']).optional(),
        img: z.string().optional(),
    })
});

export const EyeglassValidation = {
    eyeglassValidationSchema,
    updateEyeglassValidationSchema
}