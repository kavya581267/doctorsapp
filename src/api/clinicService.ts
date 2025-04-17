import { DELETE_PATIENT_APPOINTMENT, GET_CLINIC_APPOINTMENTS } from "@utils/constants";
import { apiService } from "./apiService";
import { AppointmentListResponse } from "./model/appointments/AppointmentListResponse";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { ClinicResponse } from "./model/clinic/ClinicResponse";
import { replacePlaceholders } from "@utils/utils";



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
    deleteHolidaySchedule: () => {

    },

    getClinicAppointments:async (clinicId: string, from:string, to:string): Promise<AppointmentListResponse[]> => {
        const queryParama = {
            fromDate: from,
            toDate:to
        }
        try {
            const resp = await apiService.get(replacePlaceholders(GET_CLINIC_APPOINTMENTS, { "clinic_id": clinicId }), queryParama)
            return resp.data;
        } catch (error) {
            throw error
        }
    },

    cancelAppointment: async(patientId:string, appointmentId: string, reason:string) =>{
        const bdy = {
            reason: reason
        }
        try{
           const resp =await apiService.delete(replacePlaceholders(DELETE_PATIENT_APPOINTMENT, {"patient_id": patientId,"appointment_id": appointmentId}), bdy)
           return resp.data;
        }catch(error){
        throw error
        }
    }
};
