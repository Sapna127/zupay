import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://zupay-al2k.vercel.app/api/v1/blogs/search?query=${searchQuery}`);
      handleSearch(response.data); // Update blogs state in the App component
    } catch (error) {
      console.error('Error fetching blogs', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/">My Blog</Link>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex-grow mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-md text-gray-800"
          />
        </form>

        <div>
          <Link to="/add-blog">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-100">
              + New Blog
            </button>
          </Link>
          <Link to="/sign-in">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-100 ml-2">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
