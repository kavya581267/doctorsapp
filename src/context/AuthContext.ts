import { LoginResponse } from "@api/model/client/Auth";
import React, { createContext, ReactNode } from "react";

export const AuthContext = createContext<LoginResponse|undefined>(undefined);
