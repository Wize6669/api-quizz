export interface User {
    name: string,
    lastName: string,
    email: string,
    password: string,
    roleId: number
}

export interface UserAuth extends Omit<User, 'password'> {};