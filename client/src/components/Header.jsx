import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/">My Blog</Link>
        </div>
    
        <div>
          <Link to="/add-blog">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-100">
              + New Blog
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
