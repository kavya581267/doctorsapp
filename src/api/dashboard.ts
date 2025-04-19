import { apiService } from "./apiService";
import { ClinicOverview, UserInfo } from "./model/auth/Auth";
import { ADMIN_HOME_DASHBOARD_API, DOCTOR_HOME_DASHBOARD_API} from "@utils/constants";
import { getUser } from "@utils/loadContextDetails";
import { Role } from "./model/enums";


export const dashBoardService = {

    home: async (): Promise<ClinicOverview> => {
        const user:UserInfo =await getUser();
        let url;
        const queryParam = {
            id:user.internalUserId,
        }
        if(user.roles[0]===Role.ADMIN){
            url =ADMIN_HOME_DASHBOARD_API;
        }else{
            queryParam.role = user.roles[0];
            url =  DOCTOR_HOME_DASHBOARD_API;
        }

        try {
            const response = await apiService.get(url,queryParam);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
