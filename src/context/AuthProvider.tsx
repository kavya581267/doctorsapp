import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Doctor, LoginRequest, UserInfo } from "@api/model/auth/Auth";
import { loginService } from "@api/loginService";
import { ACCESS_TOKENS_CONTEXT, DOCTORS_LIST, JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, USER, USER_CONTEXT } from "@utils/constants";
import { getObject, removeItem, storeObject } from "@utils/MdLogAsyncStorage";
import { initializeToken } from "@api/apiService";
import { dashBoardService } from "@api/dashboard";
import { LoggedInUserContext } from "@api/model/auth/LoggedinUserContext";
import { isTokenExpired } from "@utils/jwt";
import { AccessTokenContext } from "@api/model/auth/AccessTokensContext";
import { clear } from "@utils/loadContextDetails";
import { Staff } from "@api/model/staff/Staff";

type Props = { children: ReactNode }

export const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [loggedInUserContext, setLoggedinUserContext] = useState<LoggedInUserContext | undefined>(undefined)
  const [accessTokenContext, setAccessTokenContext] = useState<AccessTokenContext | undefined>(undefined)
  const [clinicDoctors, setClinicDoctors] = useState<Doctor[] | undefined>([])


  //check is usercontext exist

  const isLoggedInUserContext = async () => {
    const loggedInUserContext = await getObject<LoggedInUserContext>(USER_CONTEXT);
    const docs = await getObject<Doctor[]>(DOCTORS_LIST)
    if (loggedInUserContext) {
      setLoggedinUserContext(loggedInUserContext);
      setClinicDoctors(docs)
      return true;
    }
      return false;
  }

  //check if token context exist 

  const isValidAccessTokensrContext = async () => {
    const acessTokenContext = await getObject<AccessTokenContext>(ACCESS_TOKENS_CONTEXT)
    if (acessTokenContext) {
      const jwt = acessTokenContext.accessToken;
      //validate the token expiry
      if (isTokenExpired(jwt)) {
        const refreshTokenResp = await loginService.refresh();
        // 
        const newAccessContext = { ...acessTokenContext };
        newAccessContext.accessToken = refreshTokenResp.accessToken;
        // set acessTokenContext
        setAccessTokenContext(newAccessContext);
        await removeItem(ACCESS_TOKENS_CONTEXT);
        await storeObject(ACCESS_TOKENS_CONTEXT,newAccessContext);
      }
    } else {
      return false;
    }
    return true;
  }



  const loadToken = async () => {
    try {
      if (await isLoggedInUserContext() && await isValidAccessTokensrContext()) {
          initializeToken();
      } else {
        await AsyncStorage.clear()
      }
    } catch (error) {
      await AsyncStorage.clear()
    }
    setLoading(false);
  };



  useEffect(() => {
    loadToken();
  }, []);

  const login = async (loginRequest: LoginRequest) => {
    try {
      setLoading(true)
      const response = await loginService.login(loginRequest);

      //legacy to remove
      await storeObject(USER, response.user);
      await storeObject(JWT_REFRESH_TOKEN, response.refreshToken)
      await storeObject(JWT_ACCESS_TOKEN, response.accessToken)
      await storeObject(DOCTORS_LIST, response.doctors);
      setClinicDoctors(response.doctors)

      //set access context
      const accessTokenContext: AccessTokenContext = new AccessTokenContext();
      accessTokenContext.accessToken = response.accessToken;
      accessTokenContext.expiresIn = response.expiresIn;
      accessTokenContext.refreshToken = response.refreshToken;
      await storeObject(ACCESS_TOKENS_CONTEXT, accessTokenContext);
      setAccessTokenContext(accessTokenContext);


      initializeToken();
      // fetch logged in user clinic details 
      
      const clinicDashboardResp = await dashBoardService.home();
      clinicDashboardResp.adminDetails = !clinicDashboardResp.adminDetails ? clinicDashboardResp.staffDetails : clinicDashboardResp.adminDetails
      //set user context
      const loginUserContext: LoggedInUserContext = new LoggedInUserContext();
      loginUserContext.clinicDetails = clinicDashboardResp.clinic;
      loginUserContext.userDetails = clinicDashboardResp.adminDetails;
      await storeObject(USER_CONTEXT, loginUserContext);
      setLoggedinUserContext(loginUserContext);
      
      setLoading(false)
      return true;
    } catch (error) {
      setLoading(false)
      throw error;
    }
  };

  const logout = async () => {
    try {
      clear();
      await loginService.logout();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, loading, loggedInUserContext, clinicDoctors }}>
      {children}
    </AuthContext.Provider>
  )
}