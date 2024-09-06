import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="border-b border-gray-300 p-2">
            <p><strong>{comment.author.email}:</strong></p>
            <p>{comment.content}</p>
        </div>
    );
};

export default Comment;
