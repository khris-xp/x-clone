import { ILogin, IRegister } from "@/interfaces/auth";
import { ITweetRequest } from "@/interfaces/tweet";
import axiosInstance from "@/services/api.service";

export async function apiRequest<T>(
    url: string,
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    data?: ILogin | IRegister | string | null | ITweetRequest
): Promise<T> {
    try {
        const response = await axiosInstance.request({ url, method, data });
        return response.data;
    } catch (error) {
        const message = (error as Error).message;
        throw new Error(message);
    }
}