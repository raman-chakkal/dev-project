import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api';

// Create an axios instance
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // If API provides a specific error message, throw it
            const errorMessage = error.response.data?.message || 'Something went wrong';
            return Promise.reject(errorMessage);
        }
        return Promise.reject('Network error. Please try again later.');
    }
);


export const login = async (formData) => apiClient.post("/login", formData).then((res) => res.data);
export const register = async (formData) => apiClient.post("/register", formData).then((res) => res.data);
export const getAllArticles = async () => {return await apiClient.get('/articles');};
export const getMyArticles = async () => apiClient.get("/my-articles").then((res) => res.data);
export const createArticle = async (data) => apiClient.post("/articles", data).then((res) => res.data);
export const deleteArticle = async (id) => apiClient.delete(`/articles/${id}`).then((res) => res.data);
export const getArticleById = async (id) => apiClient.get(`/articles/${id}`).then((res) => res.data);
export const updateArticleById = async (id, data) => apiClient.put(`/articles/${id}`, data).then((res) => res.data);
export const getUserProfile = async () => apiClient.get("/profile").then((res) => res.data);
export const deleteAccount = async () => {const response = await apiClient.delete('/profile'); return response.data;}
export const updateUserProfile = async (data) => apiClient.put("/profile", data).then((res) => res.data);
export const searchArticles = async (query) => {const response = await apiClient.get('/search', { params: { query } });return response.data;};

export default apiClient;