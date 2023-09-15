export interface ITweetData {
    tweets: ITweet[];
}

export interface ITweet {
    _id: string;
    desc: string;
    img: string;
    likes: string[];
    retweets: string[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ITweetResponse {
    msg: string;
}

export interface ITweetRequest {
    desc: string;
    img?: string;
}