import { CREATE_DOCTO_APPOINTMENT, CREATE_INITIAL_NOTE, CREATE_PATIENT_VITALS, FILE_NOTE, GET_CLINIC_PATIENTS_PATH, GET_CLINIC_STAFF_PATH, GET_FACT_SHEET, UPDATE_APPOINTMENT, UPDATE_INITIAL_NOTE } from "@utils/constants";
import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { ClinicResponse } from "./model/clinic/ClinicResponse";
import { StaffRequest } from "./model/clinic/StaffRequest";
import { Staff } from "./model/staff/Staff";
import { replacePlaceholders } from "@utils/utils";
import { AppointmentRequest, AppointmentResponse, AppointmentUpdateRequest, CreateInitialNoteRequest, CreateInitialNoteResponse, FaceSheet, FileNoteRequest, PatientResponse, UpdateNoteRequest, VitalsRequest, VitalsResponse } from "./model/patient/PatientModels";



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

    updateAppointment: async (appointment: AppointmentUpdateRequest,patientId: string,appointmentId: string): Promise<AppointmentResponse>=>{
      try{
        const resp = await apiService.put(replacePlaceholders(UPDATE_APPOINTMENT,{"patient_id": patientId, "appointment_id":appointmentId}),appointment)
        return resp.data;
      }catch(error){
        throw error;
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
    },

    fetchFactSheet: async (patientId: string): Promise<FaceSheet> => {
        try {
            const resp = await apiService.get(replacePlaceholders(GET_FACT_SHEET, { "patient_id": patientId }),"")
            return resp.data;
        } catch (error) {
            throw error
        }
    },
    createInitialNote: async (patientId: string, body: CreateInitialNoteRequest): Promise<CreateInitialNoteResponse> => {
        try {
            const resp = await apiService.post(replacePlaceholders(CREATE_INITIAL_NOTE, { "patient_id": patientId }),body)
            return resp.data;
        } catch (error) {
            throw error
        }
    },

    updateInitialNote: async (patientId: string,noteId:number, body: UpdateNoteRequest): Promise<CreateInitialNoteResponse> => {
        try {
            const resp = await apiService.put(replacePlaceholders(UPDATE_INITIAL_NOTE, { "patient_id": patientId, "note_id":noteId }),body)
            return resp.data;
        } catch (error) {
            throw error
        }
    },
    fileInitialNote: async (patientId: string,noteId:number, body: FileNoteRequest): Promise<CreateInitialNoteResponse> => {
        try {
            const resp = await apiService.put(replacePlaceholders(FILE_NOTE, { "patient_id": patientId, "note_id":noteId }),body)
            return resp.data;
        } catch (error) {
            throw error
        }
    }

};
