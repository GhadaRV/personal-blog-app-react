const token = localStorage.getItem('token');

const apiUrl = process.env.PROD_ENDPOINT;
const fetchPosts = async () => {
    const response = await fetch(`${apiUrl}/api/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token, // Include the JWT token
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    return data;
};

export default fetchPosts;
