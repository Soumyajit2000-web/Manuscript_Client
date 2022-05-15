import { apiInstance } from "./api";

export const getAllCategories = async () =>{
    const tempApi = apiInstance();
    return await tempApi.get(`/categories/`);
} 

export const addCategories = async (catData) => {
    const tempApi = apiInstance();
    return await tempApi.post(`/categories/`, catData)
}