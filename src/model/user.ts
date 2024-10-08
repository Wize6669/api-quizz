export interface User {
    id?: string,
    name: string,
    lastName: string,
    email: string,
    password: string,
    changePassword?: boolean,
    roleId: number,
}

export interface UserAuth extends Omit<User, 'password'> {}
export interface UserMiddleware extends Omit<User, 'password' | 'changePassword'> {}
export interface UserChangePassword extends Pick<User, 'id'> {}
export interface UpdateUser extends Omit<User, 'password' | 'changePassword'> {}

export interface UserPagination {
    id?: string,
    name: string,
    lastName: string,
    email: string,
    delete: Date | null,
    changePassword: boolean,
    role: string | number,
}
