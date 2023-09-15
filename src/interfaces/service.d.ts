export interface IAuthService {
    login: (loginFormData: ILogin) => Promise<IAuthResponse>;
    register: (registerFormData: IRegister) => Promise<IAuthResponse>;
    getUserProfile: () => Promise<IUser>;
    getUserById: (id: string) => Promise<IUser>;
}

export interface ITweetService {
    getTweets: () => Promise<ITweetData>;
    createTweets: (data) => Promise<ITweetResponse>;
}