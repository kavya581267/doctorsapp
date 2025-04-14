import { Gender, Role } from "../enums";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserInfo;
  requiresMfa: boolean;
}

export class UserInfo {
  id: string = "";
  username: string = "";
  firstName: string = "";
  lastName: string = "";
  roles: string[] = [];
  internalUserId: number;
}

export class LoginRequest {
  email: string = "";
  password: string = "";
  mfa: string = "";
}

export class AdminRegistarationRequest {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  dateOfBirth: string = "";
  gender: Gender = Gender.MALE;
  phone: string = "";
  clinicName: string = "";
  clinicLicense: string = "";
  clinicAddress: string = "";
  clinicCity: string = "";
  clinicState: string = "";
  clinicZip: string = "";
  clinicPhone: string = "";
  clinicEmail: string = "";

  constructor(init?: Partial<AdminRegistarationRequest>) {
    Object.assign(this, init);
  }

}

export interface AdminRegistrationResponse {
  clinicId: string;
  userId: string;
  message: string;
}

export class StaffRegistration {
  clinicId: number = 0;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  dateOfBirth: string = "";
  gender: Gender = Gender.MALE;
  phone: string = "";
  role: Role = Role.ADMIN;
  address: string = "";
  city: string = "";
  state: string = "";
  zipCode: string = "";
  country: string = "";
  emergencyContactName: string = "";
  emergencyContactPhone: string = "";
  licenseNumber?:string = "";
  specialties:string[] = [];
  constructor(init?: Partial<StaffRegistration>) {
    Object.assign(this, init);
  }
}

export class PatientRegistration extends StaffRegistration {
  bloodGroup: string = "";
  createUserAccount: boolean = false;

  constructor(init?: Partial<PatientRegistration>) {
    super(init);
    Object.assign(this, init);
  }
}


export interface PatientRegistrationResponse {
  patientId: string
  mrn: string;
  userId: string;
  message: string;
  portalAccess: boolean
}



export interface RefreshTokenRequest {
  refresh_token: string
}


export interface RefreshTokenResponse{
  accessToken: string;
  expiresIn: number;
}

export interface PasswordResetRequest{
  email:string
}

export interface ResetPasswordRequest{
  email: string
  token: string
  newPassword: string
  confirmPassword: string
}

export interface UpdatePasswordRequest{
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ResendVerificationRequest{
  userId: string
  type: string
}

export interface EmailVerificationRequest{
  email: string
  otp: string
  userId: string
}

export interface PhoneVerificationRequest{
  phone: string
  otp: string
  userId: string
}


export type AdminDetails = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  clinicId: number;
};

export type Clinic = {
  id: number;
  name: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  phone: string;
  licenseNumber: string;
  active: boolean;
};

export type ClinicOverview = {
  adminDetails: AdminDetails;
  clinic: Clinic;
  staffCount: number;
  todayAppointments: any[]; // Replace `any` with a specific type if you know the shape of appointment objects
};