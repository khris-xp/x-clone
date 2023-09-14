export interface IUser {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    profilePicture: string | undefined;
    coverPicture: string;
    followers: string[];
    followings: string[];
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}