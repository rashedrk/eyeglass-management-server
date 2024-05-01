import { Schema, model } from 'mongoose';
import { TEyeglass } from './eyeglass.interface';


const eyeglassSchema = new Schema<TEyeglass>(
    {
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        frameMaterial: {
            type: String,
            enum: ['metal', 'acetate', 'plastic', 'stainless-steel', 'polycarbonate'],
            required: true,
        },
        frameShapes: {
            type: String,
            enum: ['rectangular', 'round', 'cat-eye', 'square', 'wayfarer', 'sports'],
            required: true,
        },
        color: {
            type: String,
            enum: ['black', 'blue', 'green', 'white', 'gold', 'gray', 'silver'],
            required: true,
        },
        frameType: {
            type: String,
            enum: ['full-rim', 'half-rim', 'rimless'],
            required: true,
        },
        frameSize: {
            type: String,
            enum: ['narrow', 'medium', 'wide', 'large'],
            required: true,
        },
        lensType: {
            type: String,
            enum: ['single-vision', 'progressive', 'bifocal'],
            required: true,
        },
        brand: {
            type: String,
            enum: ['lenskart', 'john-jacobs', 'fossil', 'ojos'],
            required: true,
        },
        gender: {
            type: String,
            enum: ['men', 'women', 'unisex'],
            required: true
        },
        img: {
            type: String,
            required: true,
        },
        addedBy: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Users"
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Eyeglass = model<TEyeglass>('Eyeglass', eyeglassSchema)