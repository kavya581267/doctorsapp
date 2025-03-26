const BASE_URL = "http://192.168.0.3:8080"; // Base API URL

const buildUrl = (endpoint, queryParams = {}) => {
    const url = new URL(`${BASE_URL}${endpoint}`);
    
    // Append query parameters if provided
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
        
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": ""
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
        console.error("API Error:", error);
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
