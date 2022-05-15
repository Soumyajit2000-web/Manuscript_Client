import { apiInstance } from './api'

export const getUserDetails = async (id) => {
    const tempApi = apiInstance();
    return await tempApi.get(`/users/${id}`);
}

export const deleteUser = async (id) => {
    const tempApi = apiInstance();
    return await tempApi.delete(`/users/${id}`);
}

//send userId in userData
export const updateUser = async (id, userData) => {
    const tempApi = apiInstance();
    return await tempApi.put(`/users/${id}`, userData);
}