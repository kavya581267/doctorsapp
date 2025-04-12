import { apiService } from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginRequest, LoginResponse, RefreshTokenResponse } from "./model/auth/Auth";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, LOGIN_PATH, LOGOUT_PATH, REFRESH_TOKEN_PATH, USER } from "@utils/constants";
import { getObject, removeItem } from "@utils/MdLogAsyncStorage";
import { isTokenExpired } from "@utils/jwt";


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
            await AsyncStorage.clear();
            await apiService.post(LOGOUT_PATH, {"refreshToken":refreshToken});
            await removeItem(USER);
            await removeItem(JWT_REFRESH_TOKEN);
            await removeItem(JWT_ACCESS_TOKEN);
        }catch(error){
            throw error;
        }
       
    },

    refresh: async ():Promise<string> => {
        try{
            const accessToken = await getObject<string>(JWT_ACCESS_TOKEN)
            const refreshToken = await getObject(JWT_REFRESH_TOKEN)
            const resp =  await apiService.post(REFRESH_TOKEN_PATH, {"refreshToken":refreshToken});
            const token = resp.data;
            await AsyncStorage.setItem(JWT_ACCESS_TOKEN,token);
            return token;
        }catch(error){
            throw error;
        }
    }
};
