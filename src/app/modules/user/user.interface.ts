export type TName = {
    firstName: string;
    lastName: string;
}

export type TUser = {
    id: string;
    name: TName;
    email: string;
    password: string;
    role: 'admin' | 'manager' | 'user';
    isDeleted: boolean;
}