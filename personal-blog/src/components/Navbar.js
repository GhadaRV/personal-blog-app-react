import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const token = localStorage.getItem('token');

    return (
        <nav className="bg-blue-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link to="/" className="hover:text-gray-300">My Blog</Link>
                </div>

                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    <Link to="/bloglist" className="text-white hover:text-gray-300">Blogs</Link>
                    {token ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
