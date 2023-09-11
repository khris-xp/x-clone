export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    password: string;
    username: string;
}

export interface IAuthResponse {
    accessToken: string;
}