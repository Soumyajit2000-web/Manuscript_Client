import { apiInstance } from './api';

export const registerUser = async(credentialData) => {
    const tempApi = apiInstance();
    return await tempApi.post('/auth/register', credentialData)
}

export const loginUser = async(credentialData) => {
    const tempApi = apiInstance();
    return await tempApi.post('/auth/login', credentialData);
}