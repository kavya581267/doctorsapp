import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("jwtToken");
      if (storedToken) {
        setToken(storedToken);
        setUser({ loggedIn: true }); // You can fetch user details here
      }
      setLoading(false);
    };
     loadToken();
  }, []);

  const login = async (username, password) => {
    if(password === "test"){
      await AsyncStorage.setItem("jwtToken", "dummy");
      console.log("valid password")
      const jwtToken = "dummy"
      setToken(jwtToken);
      setUser({ loggedIn: true });
      return true;
    }else{
      return false;
    }
        
  };

  const logout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};