import { CREATE_CLINIC_SCHEDULE_PATH, DELETE_PATIENT_APPOINTMENT, GET_CLINIC_APPOINTMENTS, UPDATE_CLINIC_PATH, UPDATE_CLINIC_SCHEDULE_PATH } from "@utils/constants";
import { apiService } from "./apiService";
import { AppointmentListResponse } from "./model/appointments/AppointmentListResponse";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { replacePlaceholders } from "@utils/utils";
import { ClinicUpdateResponse } from "./model/clinic/ClinicRequest";
import { ClinicScheduleUpdate } from "./model/clinic/ClinicSchedule";



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
    getClinicSchedule: async (clinicId: number): Promise<ClinicScheduleUpdate[]> => {
        try {
            const response = await apiService.get(replacePlaceholders(CREATE_CLINIC_SCHEDULE_PATH,{clinicId}),{});
            return response;
        } catch (error) {
            throw error;
        }
    },
    createClinicSchedule: async (clinicId: number,clinicSchedule:ClinicScheduleUpdate): Promise<ClinicScheduleUpdate> => {
        try {
            const response = await apiService.post(replacePlaceholders(CREATE_CLINIC_SCHEDULE_PATH,{clinicId}),clinicSchedule);
            return response;
        } catch (error) {
            throw error;
        }
    },
    updateClinicSchedule:async (clinicId: number,clinicSchedule:ClinicScheduleUpdate): Promise<ClinicScheduleUpdate> => {
        try {
            const response = await apiService.put(replacePlaceholders(UPDATE_CLINIC_SCHEDULE_PATH,{clinicId})+"/"+clinicSchedule.dayOfWeek,
            clinicSchedule);
            return response;
        } catch (error) {
            throw error;
        }
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
