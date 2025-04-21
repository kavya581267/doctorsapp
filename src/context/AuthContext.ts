import { Doctor, LoginRequest, UserInfo } from "@api/model/auth/Auth";
import { LoggedInUserContext } from "@api/model/auth/LoggedinUserContext";
import { MasterData } from "@api/model/doctor/MasterData";
import React, { createContext, Dispatch, ReactNode, SetStateAction } from "react";


export interface AuthContextProp {
    login: (req: LoginRequest) => Promise<any>;
    logout: () => void;
    loading: boolean;
    loggedInUserContext: LoggedInUserContext;
    clinicDoctors: Doctor[];
    masterData: MasterData;
    setMasterData: Dispatch<SetStateAction<MasterData>>
}

export const AuthContext = createContext<AuthContextProp | undefined>(undefined);
