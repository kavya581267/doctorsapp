import { apiService } from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginRequest, LoginResponse } from "./model/auth/Auth";



const AUTH_ENDPOINT = "/login"; // Adjust based on your API

export const loginService = {
    login: async (loginRequest: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await apiService.post(AUTH_ENDPOINT, loginRequest);
            return response;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },
    
    logout: async () => {
        await AsyncStorage.removeItem("userDetails");
    }
};
