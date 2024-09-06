import React, { useEffect, useState } from 'react';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
    const { id: postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/posts/${postId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/comments/${postId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        if (postId) {
            fetchPost();
            fetchComments();
        }
    }, [postId]);

    /*const addComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };*/
    const refreshComments = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/comments/${postId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error refreshing comments:', error);
        }
    };
    return (
        <div className="container mx-auto p-6">
            {post ? (
                <>
                    <div className="container mx-auto py-10">
                        <h1 className="text-4xl font-bold text-center mb-5">{post.title}</h1>
                        <ReactMarkdown className="prose max-w-none">{post.content}</ReactMarkdown>
                        <div className="mt-10 flex justify-between">
                            <Link to={`/posts/edit/${post._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit Post</Link>
                            <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back to Blog</Link>
                        </div>
                    </div>

                    {/* Comment Form */}
                    <CommentForm postId={postId} refreshComments={refreshComments} />

                    {/* Comment List */}
                    <CommentList postId={postId} />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BlogPost;
