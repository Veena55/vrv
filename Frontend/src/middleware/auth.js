import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Your API base URL
    withCredentials: true, // Ensure cookies are sent with requests
});

api.interceptors.response.use(
    (response) => {
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
        return Promise.reject(error);
    }
);

export default api;
