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
            id:user.internalUserId
        }
        if(user.roles[0]===Role.DOCTOR){
            queryParam.role = Role.DOCTOR;
            url =  DOCTOR_HOME_DASHBOARD_API;
        }else{
            url =ADMIN_HOME_DASHBOARD_API;
        }

        try {
            const response = await apiService.get(url,queryParam);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
