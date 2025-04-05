import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { ClinicResponse } from "./model/clinic/ClinicResponse";



export const AUTH_ENDPOINT = "/auth/register/admin"; // Adjust based on your API

export const clinicService = {
    register: async (clinicRegistration: AdminRegistarationRequest): Promise<AdminRegistrationResponse> => {
        try {
            const response = await apiService.post(AUTH_ENDPOINT, clinicRegistration);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getAllClinics: () => {

    },
    updateClinic: () => {

    }, 
    getClinicById: () => {

    },
    getClinicSchedule: () => {

    },
    createClinicSchedule: () => {

    },
    updateClinicSchedule: () => {

    },
    deleteClinicSchedule: () => {

    },
    getHolidaySchedule: () => {

    },
    updateHolidaySchedule: () => {

    },
    createHolidaySchedule: () => {

    },
    deleteHolidaySchedule: () =>{
        
    }
};
