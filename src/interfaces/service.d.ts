export interface IAuthService {
    login: (loginFormData: ILogin) => Promise<IAuthResponse>;
    register: (registerFormData: IRegister) => Promise<IAuthResponse>;
    getUserProfile: () => Promise<IUser>;
    getUserById: (id: string) => Promise<IUser>;
    getAllUsers: () => Promise<IUser[]>;
}

export interface ITweetService {
    getTweets: () => Promise<ITweetData>;
    getTweetByUser: (id: string | undefined) => Promise<ITweetData>;
    createTweets: (data: ITweetRequest) => Promise<ITweetResponse>;
    updateTweets: (id: string, data: ITweetRequest) => Promise<ITweetResponse>;
    deleteTweet: (id: string) => Promise<ITweetResponse>;
    likeTweet: (id: string) => Promise<ITweetResponse>;
    unLikeTweet: (id: string) => Promise<ITweetResponse>;
    reTweet: (id: string) => Promise<ITweetResponse>;
    unReTweet: (id: string) => Promise<ITweetResponse>;
}