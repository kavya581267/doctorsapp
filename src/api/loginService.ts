import { apiService } from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginRequest, LoginResponse } from "./model/auth/Auth";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, LOGIN_PATH, LOGOUT_PATH, USER } from "@utils/constants";



export const loginService = {
    login: async (loginRequest: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await apiService.post(LOGIN_PATH, loginRequest);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    
    logout: async () => {
        try{
            const refreshToken =  await AsyncStorage.getItem(JWT_REFRESH_TOKEN);
            await apiService.post(LOGOUT_PATH, {"refreshToken":refreshToken});
            await AsyncStorage.removeItem(USER);
            await AsyncStorage.removeItem(JWT_REFRESH_TOKEN);
            await AsyncStorage.removeItem(JWT_ACCESS_TOKEN);
        }catch(error){
            throw error;
        }
       
    },

    refresh: async () => {
        try{
            const refreshToken =  await AsyncStorage.getItem(JWT_REFRESH_TOKEN);
            await apiService.post(LOGOUT_PATH, {"refreshToken":refreshToken});
            await AsyncStorage.removeItem(USER);
            await AsyncStorage.removeItem(JWT_REFRESH_TOKEN);
            await AsyncStorage.removeItem(JWT_ACCESS_TOKEN);
        }catch(error){
            throw error;
        }
    }
};
