// Tag.js
import React from 'react';

const Tag = ({ name }) => {
    return (
        <span className='font-medium font-sans' style={styles.tag}>
            {name}
        </span>
    );
};

const styles = {
    tag: {
        display: 'inline-block',
        backgroundColor: 'rgba(75, 107, 251, 0.05)',
        color: '#4B6BFB',
        padding: '4px 10px',
        borderRadius: '6px',
        fontSize: '14px',

    },
};

export default Tag;
