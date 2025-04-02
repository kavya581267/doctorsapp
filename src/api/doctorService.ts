import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";



export const AUTH_ENDPOINT = "/auth/register/admin"; // Adjust based on your API

export const doctorService = {
    registerAdmin: async (clinicRegistration: AdminRegistarationRequest): Promise<AdminRegistrationResponse> => {
        try {
            const response = await apiService.post(AUTH_ENDPOINT, clinicRegistration);
            return response;
        } catch (error) {
            throw error;
        }
    },
    
    getDoctorSchedule: () => {

    },

    createDoctorSchedule: () => {
        
    },
    updateDoctorSchedule: () => {

    },
    deleteDoctorSchedule: () => {

    },
    getDoctorExceptions: () => {

    },
    createDoctorException: () => {

    },
    updateDoctorException: () => {

    },
    deleteDoctorException: () => {

    },
    getDoctorSpecialities: () => {

    },
    createDoctorSpeciality: () => {

    },
    updateDoctorSpeciality: () => {

    },
    deleteDoctorSpeciality: () => {

    },
};
