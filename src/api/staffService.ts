import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { ClinicResponse } from "./model/clinic/ClinicResponse";



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

    updateClinicStaff: () => {

    },
    addClinicStaff: () => {

    }, 
    getClinicStaff: (clinicId: string) => {
        
    }
};
