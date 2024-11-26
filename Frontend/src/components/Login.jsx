import React from 'react';

const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Login form submitted');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-light">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Welcome Back!
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
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
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:border-blue-400"
                            required
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
