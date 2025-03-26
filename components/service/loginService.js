import { apiService } from "./apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_ENDPOINT = "/login"; // Adjust based on your API

export const loginService = {
    // Login and retrieve JWT token
    login: async (username, password) => {
        try {
            const response = await apiService.post(AUTH_ENDPOINT, { username, password });

            if (response) {
                await AsyncStorage.setItem("userDetails", response);
            }
            return response;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },

    // Extract username from JWT token
    getUsername: async () => {
        try {
            const token = await AsyncStorage.getItem("jwtToken");
            if (!token) return null;

            // Decode JWT token (assuming it's a base64-encoded JSON)
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.username || null; // Adjust based on your token structure
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    },

    // Logout and remove token
    logout: async () => {
        await AsyncStorage.removeItem("userDetails");
    }
};
