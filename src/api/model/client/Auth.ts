export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: UserInfo;
    requiresMfa: boolean;
  }
  
  export interface UserInfo {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
    internalUserId: number;
  }