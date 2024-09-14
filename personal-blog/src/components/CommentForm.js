import React, { useState } from 'react';


const apiUrl = process.env.REACT_APP_API_URL;
const CommentForm = ({ postId, refreshComments }) => {
    const [content, setContent] = useState('');
    const token = localStorage.getItem('token');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    post: postId,
                    content,
                }),

            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newComment = await response.json();
            setContent('');
            refreshComments();
            //onCommentAdded(newComment);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                placeholder="Add a comment..."
                required
            ></textarea>
            <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Post Comment
            </button>
        </form>
    );
};

export default CommentForm;
