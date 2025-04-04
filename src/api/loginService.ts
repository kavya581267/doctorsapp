import { apiService } from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginRequest, LoginResponse } from "./model/auth/Auth";
import { LOGIN_PATH } from "@utils/constants";



export const loginService = {
    login: async (loginRequest: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await apiService.post(LOGIN_PATH, loginRequest);
            return response;
        } catch (error) {
            throw error;
        }
    },
    
    logout: async () => {
        await AsyncStorage.removeItem("userDetails");
    }
};
