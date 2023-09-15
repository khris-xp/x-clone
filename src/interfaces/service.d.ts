export interface IAuthService {
    login: (loginFormData: ILogin) => Promise<IAuthResponse>;
    register: (registerFormData: IRegister) => Promise<IAuthResponse>;
    getUserProfile: () => Promise<IUser>;
    getUserById: (id: string) => Promise<IUser>;
}

export interface ITweetService {
    getTweets: () => Promise<ITweetData>;
    createTweets: (data: ITweetRequest) => Promise<ITweetResponse>;
    updateTweets: (id: string, data: ITweetRequest) => Promise<ITweetResponse>;
    deleteTweet: (id: string) => Promise<ITweetResponse>;
    likeTweet: (id: string) => Promise<ITweetResponse>;
}