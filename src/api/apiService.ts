import { ACCESS_TOKENS_CONTEXT, BASE_URL_PREFIX, JWT_ACCESS_TOKEN } from "@utils/constants";
import { getObject } from "@utils/MdLogAsyncStorage";
import { AccessTokenContext } from "./model/auth/AccessTokensContext";
import { isTokenExpired } from "@utils/jwt";
import { loginService } from "./loginService";

const BASE_URL = BASE_URL_PREFIX

let cachedAccessTokes: AccessTokenContext = null;

export const initializeToken = async () => {
  cachedAccessTokes = await getObject(ACCESS_TOKENS_CONTEXT);
};


const getAccessToken = async () => {
       if(cachedAccessTokes){
        await initializeToken();
       }
       return cachedAccessTokes?.accessToken
}

const buildUrl = (endpoint, queryParams = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);

    Object.keys(queryParams).forEach(key => {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
            url.searchParams.append(key, queryParams[key]);
        }
    });

    return url.toString();
};


const apiCall = async (endpoint, method = "GET", body = null, queryParams = {}) => {
    try {
        const url = buildUrl(endpoint, queryParams);
        let accessToken = await getAccessToken();
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

// Export reusable functions
export const apiService = {
    get: (endpoint, queryParams) => apiCall(endpoint, "GET", null, queryParams),
    post: (endpoint, body) => apiCall(endpoint, "POST", body),
    put: (endpoint, body) => apiCall(endpoint, "PUT", body),
    delete: (endpoint) => apiCall(endpoint, "DELETE")
};
