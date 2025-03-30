import { LoginRequest, UserInfo } from "@api/model/auth/Auth";
import React, { createContext, ReactNode } from "react";


export interface AuthContextProp {
    login: (req: LoginRequest) => void;
    logout: () => void;
    user: UserInfo,
    loading: boolean
}

export const AuthContext = createContext<AuthContextProp | undefined>(undefined);
