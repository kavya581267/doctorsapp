import { CREATE_DOCTO_APPOINTMENT, CREATE_PATIENT_VITALS, GET_CLINIC_PATIENTS_PATH, GET_CLINIC_STAFF_PATH } from "@utils/constants";
import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { ClinicResponse } from "./model/clinic/ClinicResponse";
import { StaffRequest } from "./model/clinic/StaffRequest";
import { Staff } from "./model/staff/Staff";
import { replacePlaceholders } from "@utils/utils";
import { AppointmentRequest, AppointmentResponse, PatientResponse, VitalsRequest, VitalsResponse } from "./model/patient/PatientModels";



export const AUTH_ENDPOINT = "/clinic-registration"; // Adjust based on your API

export const patientService = {
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
    getClinicPatients: async (clinicId: string): Promise<PatientResponse[]> => {
        try {
            const resp = await apiService.get(replacePlaceholders(GET_CLINIC_PATIENTS_PATH, { "clinic_id": clinicId }), "")
            return resp.data;
        } catch (error) {
            throw error
        }

    },
    createAppointment: async (appointment: AppointmentRequest, patientId: string): Promise<AppointmentResponse> => {
        try {
            const resp = await apiService.post(replacePlaceholders(CREATE_DOCTO_APPOINTMENT, { "patient_id": patientId }), appointment);
            return resp.data;
        } catch (error) {
            throw error
        }

    },

    getPatientVitals: async (patientId: string): Promise<VitalsResponse[]> => {
        try {
            const resp = await apiService.get(replacePlaceholders(CREATE_PATIENT_VITALS, { "patient_id": patientId }),"")
            return resp.data;
        } catch (error) {
            throw error
        }
    },

    recordPatientVitals: async (vitals: VitalsRequest, patientId: string): Promise<VitalsResponse> => {
        try {
            const resp = await apiService.post(replacePlaceholders(CREATE_PATIENT_VITALS, { "patient_id": patientId }), vitals)
            return resp.data;
        } catch (error) {
            throw error
        }
    }
};
