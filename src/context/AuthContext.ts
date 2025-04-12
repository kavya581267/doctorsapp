import { LoginRequest, UserInfo } from "@api/model/auth/Auth";
import { LoggedInUserContext } from "@api/model/auth/LoggedinUserContext";
import React, { createContext, ReactNode } from "react";


export interface AuthContextProp {
    login: (req: LoginRequest) => void;
    logout: () => void;
    user: UserInfo,
    loading: boolean,
    loggedInUserContext: LoggedInUserContext
}

export const AuthContext = createContext<AuthContextProp | undefined>(undefined);
