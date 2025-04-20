import { GET_CLINIC_STAFF_PATH, UPDATE_CLINIC_STAFF_PATH } from "@utils/constants";
import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { ClinicResponse } from "./model/clinic/ClinicResponse";
import { StaffRequest, StaffUpdateRequest } from "./model/clinic/StaffRequest";
import { Staff } from "./model/staff/Staff";
import { replacePlaceholders } from "@utils/utils";



export const AUTH_ENDPOINT = "/clinic-registration"; // Adjust based on your API

export const staffService = {
    removeClinicStaff: async (clinicRegistration: AdminRegistarationRequest): Promise<AdminRegistrationResponse> => {
        try {
            const response = await apiService.post(AUTH_ENDPOINT, clinicRegistration);
            return response;
        } catch (error) {
            throw error;
        }
    },

    updateClinicStaff: async (staffUpdate: StaffUpdateRequest,clinicId: string, userId: string) => {
      try{
        const response = await apiService.put(replacePlaceholders(UPDATE_CLINIC_STAFF_PATH,{"clinicId" : clinicId, userId : userId}), staffUpdate);
        return response;
      }catch(error){
          throw error;
      }
    },
    addClinicStaff: () => {

    }, 
    getClinicStaff: async (clinicId: string):Promise<Staff[]> => {
        try{
            const resp = await apiService.get(replacePlaceholders(GET_CLINIC_STAFF_PATH,{"clinicId":clinicId}), "")
            return resp.data;
        }catch(error){
            throw error
        }
        
    }
};
