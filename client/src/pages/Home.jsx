import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div>
        <div className="text-[70px] font-bold mb-8 text-center">
          Publish and read the <span className='text-blue-500'>BLOGS..</span>
        </div>
      </div>
      <div className="space-x-4">
        <Link to="/add-blog">
          <button className="bg-black text-white py-5 px-10 rounded font-semibold hover:bg-gray-900">
            Add Blog
          </button>
        </Link>
        <Link to="/blogs">
          <button className="bg-blue-500 text-white font-semibold py-5 px-10 rounded hover:bg-blue-700">
            View Blogs
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
