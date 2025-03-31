import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginRequest, UserInfo } from "@api/model/auth/Auth";
import { loginService } from "@api/loginService";
import { JWT_ACCESS_TOKEN, USER, USER_CONTEXT } from "@utils/constants";
import { getObject, storeObject } from "@utils/MdLogAsyncStorage";

type Props = {children: ReactNode}

export const AuthProvider = ({ children }: Props) => {

      const [user, setUser] = useState<UserInfo|undefined>(null);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const loadToken = async () => {
          const user = await getObject<UserInfo>(USER)
          if (user) {
            setUser(user);
          }
          setLoading(false);
        };
         loadToken();
      }, []);
    
      const login = async (loginRequest: LoginRequest) => {
        try{
            const response = await loginService.login(loginRequest);
            await storeObject(USER_CONTEXT, response);
            setUser(response.user);
            return true;
        }catch(error){
        }
        return false;
      };
    
      const logout = async () => {
        await AsyncStorage.removeItem(JWT_ACCESS_TOKEN);
        setUser(null);
      };

    return (
        <AuthContext.Provider value={{login, logout, user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}