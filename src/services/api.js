import axios from "axios";

// export const apiBaseUrl = "https://manuscript-backend.herokuapp.com/api"
export const apiBaseUrl = "http://localhost:9000/api";

export const api = axios.create({
    baseURL: apiBaseUrl
})

export const apiInstance = (headers = {}) => {
    api.defaults.headers = {
        ...api.defaults.headers,
        ...headers,
    };
    api.defaults.headers.common['Content-Type'] = 'application/json';
    return api;
}
