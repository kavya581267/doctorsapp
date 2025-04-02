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

  export class LoginRequest{
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
    gender: string = "";
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

  export interface AdminRegistrationResponse{
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
  gender: string = "";
  phone: string = "";
  role: string = "";
  address: string = "";
  city: string = "";
  state: string = "";
  zipCode: string = "";
  country: string = "";
  emergencyContactName: string = "";
  emergencyContactPhone: string = "";
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