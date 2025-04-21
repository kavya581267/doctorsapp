import { Doctor, LoginRequest, UserInfo } from "@api/model/auth/Auth";
import { LoggedInUserContext } from "@api/model/auth/LoggedinUserContext";
import React, { createContext, ReactNode } from "react";


export interface AuthContextProp {
    login: (req: LoginRequest) => Promise<any>;
    logout: () => void;
    loading: boolean;
    loggedInUserContext: LoggedInUserContext;
    clinicDoctors: Doctor[]
}

export const AuthContext = createContext<AuthContextProp | undefined>(undefined);
