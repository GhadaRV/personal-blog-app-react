import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Tag from '../components/Tag'
import Container from "../components/container";

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
        <Container>
            <div className="py-10">
                <h1 className="text-4xl font-bold text-center mb-10">Latest Posts</h1>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    {posts.map((post) => (
                        <div key={post._id} className=" bg-white rounded-xl p-4 pb-6 border border-[#E8E8EA] ">
                            <img className='rounded-md' src="https://storage.googleapis.com/pod_public/1300/171857.jpg" alt="Example" />
                            <div className='mt-4'>
                                <Tag className="mt-2 ml-2" name="Technology"></Tag>
                                <Link to={`/posts/${post._id}`} className="flow-root text-2xl font-semibold font-sans hover:underline hover:text-blue-500 ml-2 pt-3 pb-5">{post.title}</Link>
                                <p className="text-gray-600">{post.excerpt}</p>
                                <div className='flex items-start mt-1.5'>
                                    <img className="flex-none w-9 h-9 ml-2 rounded-s-full`" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="user"></img>
                                    <p className=' ml-3 mr-5 font-sans font-medium text-base font text-[#97989F]'> user's name</p>
                                    <p className='font-sans font-medium text-base font text-[#97989F]'>Date</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/posts/create" className="mt-8 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Create New Post</Link>
            </div>
        </Container>
    );
};

export default BlogList;
