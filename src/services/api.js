import axios from "axios";
export const apiBaseUrl = process.env.REACT_APP_BASE_URL;

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
