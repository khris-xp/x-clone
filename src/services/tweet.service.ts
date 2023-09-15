import { ITweetService } from "@/interfaces/service";
import { ITweetData, ITweetRequest, ITweetResponse } from "@/interfaces/tweet";
import { apiRequest } from "@/repositories/api.repository";

export const tweetService: ITweetService = {
    getTweets: async (): Promise<ITweetData> =>
        apiRequest<ITweetData>('/api/tweet', 'get'),
    createTweets: async (data: ITweetRequest): Promise<ITweetResponse> =>
        apiRequest<ITweetResponse>('/api/tweet', 'post', data),
};