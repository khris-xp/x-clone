import { ITweetService } from "@/interfaces/service";
import { ITweetData, ITweetRequest, ITweetResponse } from "@/interfaces/tweet";
import { apiRequest } from "@/repositories/api.repository";

export const tweetService: ITweetService = {
    getTweets: async (): Promise<ITweetData> =>
        apiRequest<ITweetData>('/api/tweet', 'get'),
    createTweets: async (data: ITweetRequest): Promise<ITweetResponse> =>
        apiRequest<ITweetResponse>('/api/tweet', 'post', data),
    updateTweets: async (id: string, data: ITweetRequest): Promise<ITweetResponse> =>
        apiRequest<ITweetResponse>(`/api/tweet/${id}`, 'put', data),
    deleteTweet: async (id: string): Promise<ITweetResponse> =>
        apiRequest<ITweetResponse>(`/api/tweet/${id}`, 'delete'),
    likeTweet: async (id: string): Promise<ITweetResponse> =>
        apiRequest<ITweetResponse>(`/api/tweet/${id}/like`, 'post'),
};