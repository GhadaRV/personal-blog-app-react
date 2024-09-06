import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My Blog</h1>
                <p className="text-lg text-gray-600">A place to share your thoughts and read interesting posts.</p>
            </header>

            <div className="flex flex-col items-center">
                <Link
                    to="/login"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-4"
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 mb-4"
                >
                    Sign Up
                </Link>
                <Link
                    to="/bloglist"
                    className="bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800"
                >
                    View Blog Posts
                </Link>
            </div>
        </div>
    );
};

export default Home;
