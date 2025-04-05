import { REGISTER_ADMIN_PATH, REGISTER_PATIENT_PATH, REGISTER_STAFF_PATH } from "@utils/constants";
import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse, StaffRegistration, PatientRegistration, PatientRegistrationResponse } from "./model/auth/Auth";


export const registrationService = {
    registerAdmin: async (clinicRegistration: AdminRegistarationRequest): Promise<AdminRegistrationResponse> => {
        try {
            const response = await apiService.post(REGISTER_ADMIN_PATH, clinicRegistration);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    registerStaff: async (staffRegistration: StaffRegistration): Promise<AdminRegistrationResponse> => {
        try {
            const response = await apiService.post(REGISTER_STAFF_PATH, staffRegistration);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    registerPatient: async (patientRegistration: PatientRegistration): Promise<PatientRegistrationResponse> => {
        try {
            const response = await apiService.post(REGISTER_PATIENT_PATH, patientRegistration);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
