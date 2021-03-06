import { apiInstance } from './api';

export const getAllPosts = async (user = "", cat = "") => {
    const tempApi = apiInstance();
    return await tempApi.get(`/posts/?user=${user}&cat=${cat}`);
}

export const getPostDetails = async (id) => {
    const tempApi = apiInstance();
    return await tempApi.get(`/posts/${id}`);
}

export const addPost = async (postData) => {
    const tempApi = apiInstance();
    return await tempApi.post('/posts/', postData);
}

//userId is required to be passed in postData
export const updatePost = async (postId, postData) => {
    const tempApi = apiInstance();
    return await tempApi.put(`/posts/${postId}`, postData)
}

//userId is required to be passed in postData
export const deletePost = async (postId, postData) => {
    const tempApi = apiInstance();
    return await tempApi.delete(`/posts/${postId}`, { data: postData })
}

