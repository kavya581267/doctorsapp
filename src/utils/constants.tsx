import { Platform } from "react-native";

export let BASE_URL_PREFIX = "https://cors-anywhere.herokuapp.com/https://j7lfcx9ij0.execute-api.ap-south-1.amazonaws.com/prod";

BASE_URL_PREFIX = Platform.OS === "web" ? BASE_URL_PREFIX : "https://j7lfcx9ij0.execute-api.ap-south-1.amazonaws.com/prod";

//Keys
export const JWT_ACCESS_TOKEN = "access_token";
export const JWT_REFRESH_TOKEN = "refresh_token";
export const USER = "user";
export const USER_CONTEXT="user_context";
export const ACCESS_TOKENS_CONTEXT= "access_tokens";
export const CLINIC_CONTEXT="clinic_context";
export const DOCTORS_LIST="doc_list";
export const MASTER_DATA_CONTEXT = "master_data";




//auth paths
export const LOGIN_PATH = "/auth/login";
export const REFRESH_TOKEN_PATH="/auth/refresh";
export const LOGOUT_PATH = "/auth/logout";


//registration
export const REGISTER_ADMIN_PATH = "/auth/register/admin";
export const REGISTER_STAFF_PATH = "/auth/register/staff";
export const REGISTER_PATIENT_PATH = "/auth/register/patient";


//verification
export const VERIFY_EMAIL_PATH = "/auth/verify/email";
export const VERIFY_PHONE_PATH = "/auth/verify/phone";
export const RESEND_EMAIL_CODE_PATH = "/auth/verify/email/resend";
export const RESEND_PHONE_CODE_PATH = "/auth/verify/phone/resend";

//password management
export const REQUEST_PASSWORD_RESET_PATH = "/auth/reset-password";
export const RESET_PASSWORD_PATH = "/auth/password";
export const UPDATE_PASSWORD_PATH = "/auth/password";

//clinic management
export const GET_ALL_CLINICS_PATH = "/clinics";
export const GET_CLINICS_BY_ID_PATH ="/clinics/{{clinicId}}";
export const UPDATE_CLINIC_PATH ="/clinics/{{clinicId}}";

//staff management
export const GET_CLINIC_STAFF_PATH = "/clinics/{{clinicId}}/staff";
export const ADD_CLINIC_STAFF_PATH = "/clinics/{{clinicId}}/staff";
export const UPDATE_CLINIC_STAFF_PATH = "/clinics/{{clinicId}}/staff/{{userId}}";
export const REMOVE_CLINIC_STAFF_PATH = "/clinics/{{clinicId}}/staff/{{userId}}";

//clinic schedule
export const GET_CLINIC_SCHEDULE_PATH = "/clinics/{{clinicId}}/schedule";
export const CREATE_CLINIC_SCHEDULE_PATH = "/clinics/{{clinicId}}/schedule";
export const UPDATE_CLINIC_SCHEDULE_PATH = "/clinics/{{clinicId}}/schedule/MONDAY";
export const DELETE_CLINIC_SCHEDULE_PATH = "/clinics/{{clinicId}}/schedule/MONDAY";

//holiday schedule
export const GET_HOLIDAY_SCHEDULE_PATH = "/clinics/{{clinicId}}/holidays";
export const CREATE_HOLIDAY_SCHEDULE_PATH = "/clinics/{{clinicId}}/holidays";
export const UPDATE_HOLIDAY_SCHEDULE_PATH = "/clinics/{{clinicId}}/holidays/{{holidayId}}";
export const DELETE_HOLIDAY_SCHEDULE_PATH = "/clinics/{{clinicId}}/holidays/{{holidayId}}";


//doctor schedule
export const GET_DOCTOR_SCHEDULE_PATH = "/doctors/{{doctorId}}/schedule";
export const CREATE_DOCTOR_SCHEDULE_PATH = "/doctors/{{doctorId}}/schedule";
export const UPDATE_DOCTOR_SCHEDULE_PATH = "/doctors/{{doctorId}}/schedule/{{scheduleId}}";
export const DELETE_DOCTOR_SCHEDULE_PATH = "/doctors/{{doctorId}}/schedule/{{scheduleId}}";

//doctor exceptions
export const GET_DOCTOR_EXCEPTIONS_PATH = "/doctors/{{doctorId}}/exceptions";
export const CREATE_DOCTOR_EXCEPTIONS_PATH = "/doctors/{{doctorId}}/exceptions";
export const UPDATE_DOCTOR_EXCEPTIONS_PATH = "/doctors/{{doctorId}}/exceptions/{{exceptionId}}";
export const DELETE_DOCTOR_EXCEPTIONS_PATH = "/doctors/{{doctorId}}/exceptions/{{exceptionId}}";

//doctor specialties
export const GET_DOCTOR_SPECIALTIES_PATH ="/doctors/{{doctorId}}/specialties";
export const ADD_DOCTOR_SPECIALTIES_PATH ="/doctors/{{doctorId}}/specialties";
export const REMOVE_DOCTOR_SPECIALTIES_PATH ="/doctors/{{doctorId}}/specialties/{{specialtyId}}";

//master data
export const GET_ALL_SPECIALTIES_PATH ="/specialties";
export const GET_MASTER_DATA_PATH = "/master/data/{clinicId}/{specialityId}";
export const PRESENTING_COMPLAINTS_PATH = "/master/presenting-complaints";
export const FAMILY_HISTORY_PATH = "/master/family-history";
export const PROBLEMS_PATH = "/master/problems";
export const PAST_MEDICAL_HISTORY_PATH = "/master/past-medical-history";
export const MEDICATIONS_PATH = "/master/medications";
export const LAB_TEST_PATH = "/master/lab-tests"
 
//home 
export const ADMIN_HOME_DASHBOARD_API  ="/auth/admin/home"
export const DOCTOR_HOME_DASHBOARD_API = "/auth/staff/home"

export const LOGO_URL ="https://www.mdops.com/wp-content/themes/mdops/images/logo.png"

export const MASTER_DATA ="/master/data/{{clinicId}}/{{specialityId}}"


//patient
//staff management
export const GET_CLINIC_PATIENTS_PATH = "/clinics/{{clinic_id}}/patients";


//amppointments
export const CREATE_DOCTO_APPOINTMENT = "/patients/{{patient_id}}/appointments";
export const GET_DOCTOR_APPOINTMENTS_FROM = "/doctors/{{doctor_id}}/appointments"
export const GET_CLINIC_APPOINTMENTS = "/clinics/{{clinic_id}}/appointments"
export const DELETE_PATIENT_APPOINTMENT="/patients/{{patient_id}}/appointments/{{appointment_id}}"
export const UPDATE_APPOINTMENT ="/patients/{{patient_id}}/appointments/{{appointment_id}}"

//vitals
export const GET_PATIENT_VITALS = "/patients/{{patient_id}}/vitals";
export const CREATE_PATIENT_VITALS = "/patients/{{patient_id}}/vitals";
export const GET_FACT_SHEET = "/patients/{{patient_id}}"


//notes
export const CREATE_INITIAL_NOTE = "/patients/{{patient_id}}/notes"
export const UPDATE_INITIAL_NOTE= "/patients/{{patient_id}}/notes/{{note_id}}"
export const FILE_NOTE = "/patients/{{patient_id}}/notes/{{note_id}}/file"
export const DOCTOR_INPROGRESS_NOTES = "/doctors/notes"
export const PAST_NOTES = "/doctors/notes"

//save Patient medication 
export const SAVE_PATIENT_MEDICATION = "/patients/{{id}}/medications"
export const UPDATE_PATIENT_MEDICATION = "/patients/{{id}}/medications/{{medicationId}}"
