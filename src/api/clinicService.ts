import { GET_ALL_CLINICS_PATH, GET_CLINICS_BY_ID_PATH, UPDATE_CLINIC_PATH } from "@utils/constants";
import { apiService } from "./apiService";
import { AdminRegistarationRequest, AdminRegistrationResponse } from "./model/auth/Auth";
import { ClinicResponse } from "./model/clinic/ClinicResponse";
import { replacePlaceholders } from "@utils/utils";
import { ClinicRequest } from "./model/clinic/ClinicRequest";

export const clinicService = {

    getAllClinics: async () => {
    },
    updateClinic: (clinicRequest: ClinicRequest) => {
        

    }, 
    getClinicById: (id:string) => {
        const path = replacePlaceholders(GET_CLINICS_BY_ID_PATH,{"clinicId":id});
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
