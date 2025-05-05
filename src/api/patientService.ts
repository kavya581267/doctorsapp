import { CREATE_DOCTO_APPOINTMENT, CREATE_INITIAL_NOTE, CREATE_PATIENT_VITALS, DOCTOR_INPROGRESS_NOTES, FILE_NOTE, GET_CLINIC_PATIENTS_PATH, GET_CLINIC_STAFF_PATH, GET_FACT_SHEET, PAST_NOTES, SAVE_LAB_ORDERS, SAVE_LAB_RESULTS, SAVE_PATIENT_MEDICATION, UPDATE_APPOINTMENT, UPDATE_INITIAL_NOTE, UPDATE_PATIENT_MEDICATION } from "@utils/constants";
import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { ClinicResponse } from "./model/clinic/ClinicResponse";
import { Staff } from "./model/staff/Staff";
import { replacePlaceholders } from "@utils/utils";
import { AppointmentRequest, AppointmentResponse, AppointmentUpdateRequest, CreateInitialNoteRequest, CreateInitialNoteResponse, CreatePatientMedication, FaceSheet, FileNoteRequest, LabOrderRequest, LabResultsPayload, LabTestOrderResp, ListNoteResponse, PastNotesResponse, PatientMedication, PatientMedicationResponse, PatientResponse, UpdateNoteRequest, UpdatePatientMedication, VitalsRequest, VitalsResponse } from "./model/patient/PatientModels";



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
    },
    getDoctorInprogressNotes: async (clinicId:number):Promise<ListNoteResponse[]> => {
        try {
            const resp = await apiService.get(DOCTOR_INPROGRESS_NOTES, {clinicId: clinicId, filed:false})
            return resp.data;
        } catch (error) {
            throw error
        }
    },
    getDoctorPastNotes: async (clinicId:number, fromDate:string, toDate:string):Promise<PastNotesResponse[]>=>{
        const queryParam = {
            fromDate: fromDate,
            toDate: toDate,
            clinicId: clinicId,
            filed: true
        }
        let url = replacePlaceholders(PAST_NOTES,{clinicId:clinicId, filed: true});
        try{
            const resp = await apiService.get(PAST_NOTES,queryParam);
            return resp.data;
        }catch(error){
            throw error
        }
    },
    createPatientMedication: async (patientId: string, patientMedication:CreatePatientMedication):Promise<PatientMedicationResponse> => {
        try {
            const resp = await apiService.post(replacePlaceholders(SAVE_PATIENT_MEDICATION, {id: patientId}),patientMedication);
            return resp.data;
        } catch (error) {
            throw error
        }
    },
    updatePatientMedication: async (patientId: string,medicationId:string,  patientMedication:UpdatePatientMedication):Promise<PatientMedicationResponse> => {
        try {
            const resp = await apiService.put(replacePlaceholders(UPDATE_PATIENT_MEDICATION, {id: patientId, medicationId: medicationId}),patientMedication);
            return resp.data;
        } catch (error) {
            throw error
        }
    },
    savePatientlabOrders: async (patientId: string, order:LabOrderRequest):Promise<LabTestOrderResp> => {
        try {
            const resp = await apiService.post(replacePlaceholders(SAVE_LAB_ORDERS, {patient_id: patientId}),order);
            return resp.data;
        } catch (error) {
            throw error
        }
    },
    savePatientlabResults: async (patientId: string,  labResults:LabResultsPayload):Promise<any> => {
        try {
            const resp = await apiService.post(replacePlaceholders(SAVE_LAB_RESULTS, {patient_id: patientId}),labResults);
            return resp.data;
        } catch (error) {
            throw error
        }
    }

};
