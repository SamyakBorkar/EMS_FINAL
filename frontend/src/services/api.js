import axios from 'axios'

const API = axios.create({
    baseURL: 'https://ems-final.onrender.com/api',
    // baseURL: 'http://localhost:5000/api',
    withCredentials: true,
});

API.interceptors.request.use((req)=>{
    const token = localStorage.getItem('token');
    if(token){
        req.headers.Authorization= `Bearer ${token}`
    }
    return req
});

export default API;