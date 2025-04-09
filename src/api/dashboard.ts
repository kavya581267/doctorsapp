import { apiService } from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ClinicOverview, LoginRequest, LoginResponse, RefreshTokenResponse, UserInfo } from "./model/auth/Auth";
import { ADMIN_HOME_DASHBOARD_API, JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, LOGIN_PATH, LOGOUT_PATH, USER } from "@utils/constants";
import { getUser } from "@utils/loadContextDetails";


export const dashBoardService = {
    home: async (): Promise<ClinicOverview> => {
        const user:UserInfo =await getUser();
        try {
            const response = await apiService.get(ADMIN_HOME_DASHBOARD_API+"?id="+user.internalUserId);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
