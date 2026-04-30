import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://botw-compendium.herokuapp.com/api/v3",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = "Something went wrong";

    if (error.response) {
      message = `API Error: ${error.response.status}`;
    } else if (error.request) {
      message = "No response from server";
    } else {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  }
);

export default apiClient;