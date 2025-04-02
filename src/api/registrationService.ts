import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";



export const AUTH_ENDPOINT = "/auth/register/admin"; // Adjust based on your API

export const registrationService = {
    registerAdmin: async (clinicRegistration: AdminRegistarationRequest): Promise<AdminRegistrationResponse> => {
        try {
            const response = await apiService.post(AUTH_ENDPOINT, clinicRegistration);
            return response;
        } catch (error) {
            throw error;
        }
    }
};
