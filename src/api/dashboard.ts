import { apiService } from "./apiService";
import { ClinicOverview, UserInfo } from "./model/auth/Auth";
import { ADMIN_HOME_DASHBOARD_API, DOCTOR_HOME_DASHBOARD_API, MASTER_DATA } from "@utils/constants";
import { getUser } from "@utils/loadContextDetails";
import { Role } from "./model/enums";
import { replacePlaceholders } from "@utils/utils";
import { MasterData } from "./model/doctor/MasterData";


export const dashBoardService = {

    home: async (): Promise<ClinicOverview> => {
        const user: UserInfo = await getUser();
        let url;
        const queryParam = {
            id: user.internalUserId,
        }
        if (user.roles[0] === Role.ADMIN) {
            url = ADMIN_HOME_DASHBOARD_API;
        } else {
            queryParam.role = user.roles[0];
            url = DOCTOR_HOME_DASHBOARD_API;
        }

        try {
            const response = await apiService.get(url, queryParam);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    masterData: async (clinicId: number, specialityId: number): Promise<MasterData> => {
        try {
            const resp = await apiService.get(replacePlaceholders(MASTER_DATA, { clinicId: clinicId, specialityId: specialityId }), "");
            return resp.data;
        } catch (error) {
            throw error;
        }
    }
};
