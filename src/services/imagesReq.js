import axios from "axios";
import { apiBaseUrl } from './api';

const api = axios.create({
    baseURL: apiBaseUrl
})

const apiInstance = (headers = {}) => {
    api.defaults.headers = {
        ...api.defaults.headers,
        ...headers,
    };
    api.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    return api;
}

export const uploadImage = async (imgData) => {
    const api = apiInstance();
    return await api.post('/images/upload', imgData);
}

export const getImage = async (id) => {
    const api = apiInstance();
    return await api.get(`/images/upload/${id}`);
}