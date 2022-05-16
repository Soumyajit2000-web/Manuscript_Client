import { apiInstance } from './api';

export const sendReport = async(data) => {
    const api = apiInstance();
    return await api.post('/reports', data);
}