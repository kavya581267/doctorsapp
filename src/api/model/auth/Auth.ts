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