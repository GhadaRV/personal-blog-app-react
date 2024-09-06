import React, { useEffect, useState } from 'react';
import Comment from './Comment';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/comments/${postId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("comments : ", data)
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        if (postId) {
            fetchComments();
        }
    }, [postId]);

    return (
        <div className="mt-4">
            {comments.length > 0 ? (
                comments.map(comment => (
                    <Comment key={comment.user} comment={comment} />
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
};

export default CommentList;
