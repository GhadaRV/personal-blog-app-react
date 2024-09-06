import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/posts/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
            .catch((error) => console.error('Error fetching post:', error));
    }, [id]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold text-center mb-5">{post.title}</h1>
            <ReactMarkdown className="prose max-w-none">{post.content}</ReactMarkdown>
            <div className="mt-10 flex justify-between">
                <Link to={`/posts/edit/${post._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit Post</Link>
                <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back to Blog</Link>
            </div>
        </div>
    );
};

export default BlogPost;
