import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const apiUrl = process.env.PROD_ENDPOINT;
const PostForm = ({ mode }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (mode === 'edit' && id) {
            fetch(`${apiUrl}/api/posts/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setTitle(data.title);
                    setContent(data.content);
                })
                .catch((error) => console.error('Error fetching post:', error));
        }
    }, [id, mode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { title, content };
        const token = localStorage.getItem('token');
        const response = mode === 'edit'
            ? await fetch(`${apiUrl}/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(payload),
            })
            : await fetch(`${apiUrl}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(payload),
            });

        if (response.ok) {
            navigate('/');
        } else {
            console.error('Error submitting post');
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold text-center mb-5">{mode === 'edit' ? 'Edit Post' : 'Create New Post'}</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">Content (Markdown supported)</label>
                    <textarea
                        id="content"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="10"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                        {mode === 'edit' ? 'Update Post' : 'Create Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
