import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Your API base URL
    withCredentials: true, // Ensure cookies are sent with requests
});

api.interceptors.response.use(
    (response) => {
        const { status, config } = response;
        if (status == 201) {
            if (config.method === 'post') {
                toast.success("Data added successfully!");
            }
        }
        if (status == 200) {
            if (config.method === 'put') {
                toast.success("Data updated successfully!");
            }
            if (config.method === 'delete') {
                toast.success("Data deleted successfully!");
            }
        }
        return response;
    },
    error => {
        console.log(error.response.status);

        if (error.response && error.response.status === 401) {
            const currentUrl = window.location.pathname;  // Get the current URL

            if (currentUrl !== '/') {
                console.log(currentUrl);
                window.location.href = '/'
            }
        }
        if (error.response && error.response.status === 400) {
            toast.error("Data Already Exists!!");
        }
        return Promise.reject(error);
    }
);

export default api;
