import { Schema, model } from "mongoose";
import { TName, TUser } from "./user.interface";
import config from "../../config/config";
import bcrypt from 'bcrypt';

const nameSchema = new Schema<TName>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
}, { _id: false })

const userSchema = new Schema<TUser>({
    name: {
        type: nameSchema,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        required: true,
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    }
}, {
    timestamps: true,
    versionKey: false
});


//Middlewares
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcyrpt_salt_rounds));
    next();
})


userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
})

export const User = model<TUser>('user', userSchema);