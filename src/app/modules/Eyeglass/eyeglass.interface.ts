import { Types } from "mongoose"

export type TEyeglass = {
    name: string,
    quantity: number,
    price: number,
    frameMaterial: 'metal' | 'acetate' | 'plastic' | 'stainless-steel' | 'polycarbonate',
    frameShapes: 'rectangular' | 'round' | 'cat-eye' | 'square' | 'wayfarer' | 'sports',
    color: 'black' | 'blue' | 'green' | 'white' | 'gold' | 'gray' | 'silver',
    frameType: 'full-rim' | 'half-rim' | 'rimless',
    frameSize: 'narrow' | 'medium' | 'wide' | 'large',
    lensType: 'single-vision' | 'progressive' | 'bifocal',
    brand: 'lenskart' | 'john-jacobs' | 'fossil' | 'ojos',
    gender: 'men' | 'women' | 'unisex',
    img: string,
    addedBy: Types.ObjectId,
    isDeleted: boolean,
}