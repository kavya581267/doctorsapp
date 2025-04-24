import { ADD_DOCTOR_SPECIALTIES_PATH, CREATE_DOCTOR_EXCEPTIONS_PATH, CREATE_DOCTOR_SCHEDULE_PATH, DELETE_DOCTOR_EXCEPTIONS_PATH, DELETE_DOCTOR_SCHEDULE_PATH, FAMILY_HISTORY_PATH, GET_DOCTOR_APPOINTMENTS_FROM, LAB_TEST_PATH, MEDICATIONS_PATH, PAST_MEDICAL_HISTORY_PATH, PRESENTING_COMPLAINTS_PATH, PROBLEMS_PATH, REMOVE_DOCTOR_SPECIALTIES_PATH, UPDATE_DOCTOR_EXCEPTIONS_PATH, UPDATE_DOCTOR_SCHEDULE_PATH } from "@utils/constants";
import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { DoctorSchedule } from "./model/doctor/DoctorSchedule";
import { replacePlaceholders } from "@utils/utils";
import { DoctorExceptionRequest } from "./model/doctor/DoctorException";
import { DoctorSpecialtyRequest } from "./model/doctor/DoctorSpecialtyRequest";
import { AppointmentListResponse } from "./model/appointments/AppointmentListResponse";
import {  LabTest, Medication, InitialCommonNoteRequest, ProblemsRequest, Symptom, ProblemsResponse, MedicationsResponse, LabTestResponse, MedicationsRequest } from "./model/doctor/MasterData";



export const DOCTOR_ID = "456"

export const doctorService = {

    getDoctorSchedule: () => {

    },

    createDoctorSchedule: async (doctorSchedule: DoctorSchedule, docId: string): Promise<any> => {
        try {
            const response = await apiService.post(replacePlaceholders(CREATE_DOCTOR_SCHEDULE_PATH, { doctorId: docId }), doctorSchedule)
            return response.data;
        } catch (error) {
            throw error
        }
    },
    updateDoctorSchedule: async (doctorSchedule: DoctorSchedule, docId: string, scheduleId: string) => {
        try {
            const response = await apiService.put(replacePlaceholders(UPDATE_DOCTOR_SCHEDULE_PATH, { doctorId: docId, scheduleId: scheduleId }), doctorSchedule)
            return response.data;
        } catch (error) {
            throw error
        }
    },
    deleteDoctorSchedule: async (doctorId: string, scheduleId: string) => {
        try {
            const response = await apiService.delete(replacePlaceholders(DELETE_DOCTOR_SCHEDULE_PATH, { doctorId: doctorId, scheduleId: scheduleId }))
            return response.data;
        } catch (error) {
            throw error
        }
    },
    getDoctorExceptions: () => {

    },
    createDoctorException: async (doctorExceptionRequest: DoctorExceptionRequest, docId: string): Promise<any> => {
        try {
            const response = await apiService.post(replacePlaceholders(CREATE_DOCTOR_EXCEPTIONS_PATH, { doctorId: docId }), doctorExceptionRequest)
            return response.data;
        } catch (error) {
            throw error
        }
    },
    updateDoctorException: async (doctorExceptionRequest: DoctorExceptionRequest, docId: string, exceptionId: string): Promise<any> => {
        try {
            const response = await apiService.put(replacePlaceholders(UPDATE_DOCTOR_EXCEPTIONS_PATH, { doctorId: docId, exceptionId: exceptionId }), doctorExceptionRequest)
            return response.data;
        } catch (error) {
            throw error
        }
    },
    deleteDoctorException: async (docId: string, exceptionId: string) => {
        try {
            const response = await apiService.delete(replacePlaceholders(DELETE_DOCTOR_EXCEPTIONS_PATH, { doctorId: docId, scheduleId: exceptionId }))
            return response.data;
        } catch (error) {
            throw error
        }

    },
    getDoctorSpecialities: () => {

    },
    createDoctorSpeciality: async (docSpeciality: DoctorSpecialtyRequest, docId: string) => {
        try {
            const response = await apiService.post(replacePlaceholders(ADD_DOCTOR_SPECIALTIES_PATH, { doctorId: docId }), docSpeciality)
            return response.data;
        } catch (error) {
            throw error
        }

    },
    deleteDoctorSpeciality: async (docId: string, specialtyId: string) => {
        try {
            const response = await apiService.delete(replacePlaceholders(REMOVE_DOCTOR_SPECIALTIES_PATH, { doctorId: docId, specialtyId: specialtyId }))
            return response.data;
        } catch (error) {
            throw error
        }
    },
    getDoctorAppointments: async (docId: string, fromDate: string, toDate: string): Promise<AppointmentListResponse[]> => {
        const queryParam = {
            fromDate: fromDate,
            toDate: toDate
        }
        let url = replacePlaceholders(GET_DOCTOR_APPOINTMENTS_FROM, { doctor_id: docId });
        try {
            const response = await apiService.get(url, queryParam);
            return response.data;
        } catch (error) {
            throw error
        }
    },

    //Master Data
    createPresentingComplaints: async (complaints: InitialCommonNoteRequest):Promise<Symptom> => {

        try {
            const response = await apiService.post(PRESENTING_COMPLAINTS_PATH, complaints);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createFamilyHistory: async (famHistory: InitialCommonNoteRequest):Promise<Symptom> => {
        try {
            const response = await apiService.post(FAMILY_HISTORY_PATH, famHistory);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createProblems: async (problem: ProblemsRequest):Promise<ProblemsResponse> => {
        try {
            const response = await apiService.post(PROBLEMS_PATH, problem);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createPastMedicalHistory: async (medicalHistory: InitialCommonNoteRequest):Promise<Symptom> => {
        try {
            const response = await apiService.post(PAST_MEDICAL_HISTORY_PATH, medicalHistory);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createMedications: async (medication: MedicationsRequest):Promise<Medication> => {
        try {
            const response = await apiService.post(MEDICATIONS_PATH, medication);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createLabTest: async (labTest: LabTest):Promise<LabTestResponse> => {
        try {
            const response = await apiService.post(LAB_TEST_PATH, labTest);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
