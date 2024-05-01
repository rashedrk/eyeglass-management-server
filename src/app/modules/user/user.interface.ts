export type TName = {
    firstName: string;
    lastName: string;
}

export type TUser = {
    name: TName;
    email: string;
    password: string;
    role: 'admin' | 'manager' | 'user';
    status: 'in-progress' | 'blocked';
}