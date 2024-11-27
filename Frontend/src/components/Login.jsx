import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [formData, setFormdata] = useState({ 'email': '', 'passwordHash': '' });

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({ ...prev, [name]: value }))
    }


    const verifyUserLogin = async () => {
        const { data } = await axios.post('http://localhost:8080/login/', formData, { withCredentials: true });
        return data;
    }

    // Create mutation
    const mutation = useMutation({
        mutationFn: verifyUserLogin,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchUsers']);
            toast.success('Login Successfully.');
            navigate('/home');
        },
        onError: (error) => {
            toast.error("Invalid Credentail.")
            console.error('Error in login user:', error.status);
        },
    });

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here
        mutation.mutate(formData);

        // console.log('Login form submitted');
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${theme == 'light' ? 'bg-light' : 'bg-gray-950'}`}>
            <div className={`w-full max-w-md ${theme == 'light' ? 'bg-light' : 'bg-gray-900'} rounded-lg shadow-md p-8`}>
                <h2 className={`text-2xl font-semibold text-center ${theme == 'light' ? 'text-gray-700 mb-6' : 'text-light'} `}>
                    Welcome Back!
                </h2>
                <form onSubmit={handleLogin} className="space-y-4" autoComplete='off'>
                    <div>
                        <label
                            htmlFor="email"
                            className={`mb-0 block text-sm font-medium ${theme == 'light' ? 'text-gray-600' : 'text-light'} `}
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-blue-400"
                            required
                            onChange={handleFormData}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className={`mb-0 block text-sm font-medium ${theme == 'light' ? 'text-gray-600' : 'text-light'} `}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="passwordHash"
                            placeholder="Enter your password"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-blue-400"
                            required
                            onChange={handleFormData}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-theme text-white py-2 rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                        Login
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;
