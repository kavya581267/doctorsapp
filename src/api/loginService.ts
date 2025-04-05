import { apiService } from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginRequest, LoginResponse, RefreshTokenResponse } from "./model/auth/Auth";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, LOGIN_PATH, LOGOUT_PATH, USER } from "@utils/constants";
import { getObject, removeItem } from "@utils/MdLogAsyncStorage";


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
            const refreshToken = await getObject<string>(JWT_REFRESH_TOKEN);
            await apiService.post(LOGOUT_PATH, {"refreshToken":refreshToken});
            await removeItem(USER);
            await removeItem(JWT_REFRESH_TOKEN);
            await removeItem(JWT_ACCESS_TOKEN);
        }catch(error){
            throw error;
        }
       
    },

    refresh: async ():Promise<any> => {
        try{
            const refreshToken =  await AsyncStorage.getItem(JWT_REFRESH_TOKEN);
            const resp =  await apiService.post(LOGOUT_PATH, {"refreshToken":refreshToken});
            const token = resp.data;
            await AsyncStorage.setItem(JWT_ACCESS_TOKEN,token);
        }catch(error){
            throw error;
        }
    }
};
