import { ITweetService } from "@/interfaces/service";
import { ITweetData } from "@/interfaces/tweet";
import { apiRequest } from "@/repositories/api.repository";

export const tweetService: ITweetService = {
    getTweets: async (): Promise<ITweetData> =>
        apiRequest<ITweetData>('/api/tweet', 'get'),
};