'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuth } from '@/hooks/useAuth';// Import the useAuth hook
import dotenv from 'dotenv'

dotenv.config();


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth(); // Use the useAuth hook to access setUser function
    const router = useRouter();

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                return;
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                email: email,
                password: password
            });
            console.log(res);
            if (res.status === 200) {
                Cookies.set('token', res.data.data.token);
                Cookies.set('email', res.data.data.email);

                // Update user session using setUser function from useAuth
                setUser({ token: res.data.token, email: res.data.email });

                router.replace('/');
                window.location.reload();
            }
        } catch (err) {
            // Handle login error
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-md shadow-lg backdrop-filter backdrop-blur-md bg-opacity-30 w-96">
                <h2 className="text-2xl font-semibold mb-6 text-white">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-gray-200 bg-opacity-20"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-gray-200 bg-opacity-20"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-green-500 w-full text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
