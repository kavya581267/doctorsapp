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

//home 
export const ADMIN_HOME_DASHBOARD_API  ="/auth/admin/home"
