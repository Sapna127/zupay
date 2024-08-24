import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://zupay-al2k.vercel.app/api/v1/blogs');
        console.log(response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Blog Posts</h2>
      <ul className="space-y-6">
        {Array.isArray(blogs) && blogs.map(blog => (
          <li key={blog._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <Link to={`/blogs/${blog._id}`}>
              <h1 className="text-2xl font-semibold text-gray-800">{blog.title}</h1>
              <h2 className="text-xl font-medium text-gray-600 mt-2">{blog.subtitle}</h2>
              <p className="text-gray-700 mt-4">{blog.desc.substring(0, 150)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBlogs;
