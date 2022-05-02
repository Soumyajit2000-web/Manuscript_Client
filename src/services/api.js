import axios from "axios";

export const apiBaseUrl = "http://localhost:7000/api"

export const api = axios.create({
    baseURL: apiBaseUrl
})

export const apiInstance = () => {
    api.defaults.headers.common['Content-Type'] = 'application/json';
    return api;
}
