import { IAuthResponse, ILogin, IRegister } from "@/interfaces/auth";
import { IAuthService } from "@/interfaces/service";
import { IUser } from "@/interfaces/user";
import { apiRequest } from "@/repositories/api.repository";

export const authService: IAuthService = {
    login: async (loginFormData: ILogin): Promise<IAuthResponse> =>
        apiRequest<IAuthResponse>('/user/login', 'post', loginFormData),
    register: async (registerFormData: IRegister): Promise<IAuthResponse> =>
        apiRequest<IAuthResponse>('/user/register', 'post', registerFormData),
    getUserProfile: async (): Promise<IUser> =>
        apiRequest<IUser>('/user/profile', 'get'),
    getUserById: async (id: string): Promise<IUser> =>
        apiRequest<IUser>(`/user/users/${id}`, 'get'),
    getAllUsers: async (): Promise<IUser[]> =>
        apiRequest<IUser[]>('/user', 'get'),
};