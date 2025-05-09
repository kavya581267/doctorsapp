import { DELETE_PATIENT_APPOINTMENT, GET_CLINIC_APPOINTMENTS, UPDATE_CLINIC_PATH } from "@utils/constants";
import { apiService } from "./apiService";
import { AppointmentListResponse } from "./model/appointments/AppointmentListResponse";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { replacePlaceholders } from "@utils/utils";
import { ClinicUpdateResponse } from "./model/clinic/ClinicRequest";



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
    updateClinic:async (clinicId: number): Promise<ClinicUpdateResponse> => {
       try {
            const response = await apiService.put(UPDATE_CLINIC_PATH, clinicId);
            return response;
        } catch (error) {
            throw error;
        }
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
