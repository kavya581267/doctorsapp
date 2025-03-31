import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginRequest, UserInfo } from "@api/model/auth/Auth";
import { loginService } from "@api/loginService";

type Props = {children: ReactNode}

export const AuthProvider = ({ children }: Props) => {

      const [user, setUser] = useState<UserInfo|undefined>(null);
      const [token, setToken] = useState(null);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const loadToken = async () => {
          const storedToken = await AsyncStorage.getItem("jwtToken");
          if (storedToken) {
            setToken(storedToken);
            setUser({lastName:"test", firstName:"first", id: "1234", roles: [],internalUserId: 123456, username:"testuser"}); // You can fetch user details here
          }
          setLoading(false);
        };
         loadToken();
      }, []);
    
      const login = async (loginRequest: LoginRequest) => {
        try{
            setLoading(true)
            const response = await loginService.login(loginRequest);
            await AsyncStorage.setItem("jwtToken", response.accessToken);
            setToken(response.accessToken);
            setUser(response.user);
            setLoading(false)
            console.log(response)
            return true;
        }catch(error){
          console.log(error)
          setLoading(false);
        }   
        return false;
      };
    
      const logout = async () => {
        await AsyncStorage.removeItem("jwtToken");
        setToken(null);
        setUser(null);
      };

    return (
        <AuthContext.Provider value={{login, logout, user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}