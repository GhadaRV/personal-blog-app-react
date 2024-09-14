import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_API_URL;
const BlogList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/api/posts`)
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold text-center mb-10">Blog Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white shadow-lg rounded-lg p-5">
                        <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
                        <p className="text-gray-600">{post.excerpt}</p>
                        <Link to={`/posts/${post._id}`} className="text-blue-500 hover:underline mt-3 inline-block">Read More</Link>
                    </div>
                ))}
            </div>
            <Link to="/posts/create" className="mt-8 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Create New Post</Link>
        </div>
    );
};

export default BlogList;
