import { apiService } from "./apiService";
import { ClinicOverview, UserInfo } from "./model/auth/Auth";
import { ADMIN_HOME_DASHBOARD_API} from "@utils/constants";
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
