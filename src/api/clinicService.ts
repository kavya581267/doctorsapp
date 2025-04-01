import { apiService } from "./apiService";
import { ClinicRequest } from "./model/clinic/ClinicRequest";
import { ClinicResponse } from "./model/clinic/ClinicResponse";



export const AUTH_ENDPOINT = "/clinic-registration"; // Adjust based on your API

export const clinicService = {
    register: async (clinicRegistration: ClinicRequest): Promise<ClinicResponse> => {
        try {
            const response = await apiService.post(AUTH_ENDPOINT, clinicRegistration);
            return response;
        } catch (error) {
            throw error;
        }
    }
};
