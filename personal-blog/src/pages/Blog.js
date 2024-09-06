import React, { useEffect, useState } from 'react';
import fetchPosts from '../api/posts';

const Blog = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchPosts();
            setPosts(data);
        };

        getPosts();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
            {posts.map(post => (
                <div key={post._id} className="mb-4 p-4 bg-white shadow-md rounded-md">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                </div>
            ))}
        </div>
    );
};

export default Blog;
