import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginRequest, UserInfo } from "@api/model/auth/Auth";
import { loginService } from "@api/loginService";
import { JWT_ACCESS_TOKEN, JWT_REFRESH_TOKEN, USER, USER_CONTEXT } from "@utils/constants";
import { getObject, storeObject } from "@utils/MdLogAsyncStorage";
import { initializeToken } from "@api/apiService";

type Props = {children: ReactNode}

export const AuthProvider = ({ children }: Props) => {

      const [user, setUser] = useState<UserInfo|undefined>(null);
      const [loading, setLoading] = useState(true);
      const [jwt, setJwt] = useState(null);
    
      useEffect(() => {
        const loadToken = async () => {
          const user = await getObject<UserInfo>(USER)
          const jwt = await getObject<string>(JWT_ACCESS_TOKEN)
          if (user && jwt) {
            setUser(user);
            setJwt(jwt)
            initializeToken();
          }
          setLoading(false);
        };
         loadToken();
      }, []);
    
      const login = async (loginRequest: LoginRequest) => {
        try{
            const response = await loginService.login(loginRequest);
            console.log(response)
            await storeObject(USER_CONTEXT, response);
            await storeObject(USER, response.user);
            await storeObject(JWT_REFRESH_TOKEN,response.refreshToken)
            await storeObject(JWT_ACCESS_TOKEN,response.accessToken)
            setUser(response.user);
            setJwt(response.accessToken);
            initializeToken();
            return true;
        }catch(error){
          throw error;
        }
      };
    
      const logout = async () => {
        await loginService.logout();
        await AsyncStorage.removeItem(JWT_ACCESS_TOKEN);
        setUser(null);
      };

    return (
        <AuthContext.Provider value={{login, logout, user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}