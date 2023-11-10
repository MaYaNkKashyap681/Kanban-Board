"use client"
import axios from 'axios';
// src/components/Register.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleRegister = async () => {
        try {
            if (!name || !email || !password) {
                return;
            }

            const res = await axios.post('http://localhost:8000/auth/register', {
                name: name,
                email: email,
                password: password
            })

            if (res.status === 200) {
                console.log(res.data);
                router.replace('/')
            
            }
        }
        catch (err) {

        }
        finally {
            setName('')
            setEmail('')
            setPassword('')
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-md shadow-lg backdrop-filter backdrop-blur-md bg-opacity-30 w-96">
                <h2 className="text-2xl font-semibold mb-6 text-white">Register</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-200 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-gray-200 bg-opacity-20"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
