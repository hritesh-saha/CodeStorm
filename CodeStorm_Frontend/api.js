const BASE_URL = "https://code-storm-backend.vercel.app/";



export const apiRequest = async (endpoint, method = "GET", data = null) => {
    const options = {
        method,
        headers: { "Content-Type": "application/json" },
    };
    
    if (data) options.body = JSON.stringify(data);

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Request failed");
        return result;
    } catch (error) {
        console.error("API Error:", error.message);
        return { error: error.message };
    }
};
