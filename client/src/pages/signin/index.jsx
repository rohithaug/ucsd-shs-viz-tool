// IMPORT LIBRARIES
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import CryptoJS from 'crypto-js';

// IMPORT COMPONENTS
import Layout from './components/layout';

const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

export default function Page() {
    const router = useRouter();
    const [signInLoading, setSignInLoading] = useState(false);
    const [signInFailed, setSignInFailed] = useState(false);

    const handleSignIn = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setSignInLoading(true);
        try {
            const formData = new FormData(event.target);
            const email = formData.get('email');
            const password = formData.get('password');
            const hashedPassword = hashPassword(password);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/admin/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: hashedPassword,
                }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error(errorDetails);
                setSignInLoading(false);
                setSignInFailed(true);
            } else {
                setSignInLoading(false);
                setSignInFailed(false);
                const info = await response.json();
                Cookie.set('token', info.token);
                router.push('/dashboard');
            }
        } catch (error) {
            console.error(error);
            setSignInLoading(false);
            setSignInFailed(true);
        }
    };
    
    return (
        <div class="flex items-center justify-center h-screen">
            <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form class="space-y-6" onSubmit={handleSignIn}>
                    <div class="flex items-center justify-center">
                        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Welcome back</h5>
                    </div>
                    <div class="flex items-center justify-center">
                        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Log in to your SHS account</h5>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@ucsd.edu" required />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    {signInFailed && (
                        <div className="text-red-500 text-sm mt-2">
                            Invalid credentials. Please check your email and password.
                        </div>
                    )}
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Login to your account</button>
                </form>
            </div>
        </div>
    );
};

Page.getLayout = function getLayout(page) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }